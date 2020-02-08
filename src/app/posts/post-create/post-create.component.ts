import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PostsService} from '../posts.service';
import {Post} from '../posts.model';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

    post: Post;
    isLoading = false;
    form: FormGroup;
    formResult: FormGroup;
    sequencePreview: string;
        formats: { value: string; viewValue: string }[] = [
        {value: 'fasta', viewValue: 'Fasta'},
        {value: 'fastq', viewValue: 'Fastq'},
        {value: 'pir', viewValue: 'Pir'},
        {value: 'phylip', viewValue: 'Phylip'},
        {value: 'pdb', viewValue: 'Pdb'},
        {value: 'genbank', viewValue: 'Genbank'},
        {value: 'qual', viewValue: 'Qual'}
        ];

    formatsOut: { value: string; viewValue: string }[] = [
        {value: 'fasta', viewValue: 'Fasta'},
        {value: 'fastq', viewValue: 'Fastq'},
        {value: 'pir', viewValue: 'Pir'},
        {value: 'phylip', viewValue: 'Phylip'},
        {value: 'pdb', viewValue: 'Pdb'},
        {value: 'genbank', viewValue: 'Genbank'},
        {value: 'seqxml', viewValue: 'Seqxml'},
        {value: 'qual', viewValue: 'Qual'}
        ];
    private resultPath: string;

    constructor(public postsService: PostsService) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            content: new FormControl(null, {
                // validators: [Validators.required]
            }),
            sequence: new FormControl(null, {
                // validators: [Validators.required]
            }),
            inputFormat: new FormControl(null, {}),
            outputFormat: new FormControl(null, {})
        });

        this.formResult = new FormGroup({
            result: new FormControl(null, {
                // validators: [Validators.required]
            })
        });

        this.form.get('inputFormat').setValue(this.formats[0].value);
        this.form.get('outputFormat').setValue(this.formats[2].value);
    }

    onConvert(): void {

        this.form.get('content').setErrors(null);
        this.form.get('sequence').setErrors(null);

        if (!(this.form.get('content').value || this.form.get('sequence').value)) {
            this.form.get('content').setErrors({required: true});
            this.form.get('sequence').setErrors({required: true});
        }

        if (this.form.invalid) {
            return;
        }

        this.isLoading = true;
        const format = this.form.value.inputFormat + '_to_' + this.form.value.outputFormat;
        this.postsService.convert(this.form.value.content, this.form.value.sequence, format)
            .subscribe(data => {
                this.isLoading = false;
                console.log('convert::result');
                console.log(data);
                this.resultPath = this.postsService.getDownloadPah(data.resultPath);
                // this.resultPath = data.resultPath;
                this.formResult.get('result').setValue(data.result);
            });
    }

    onFilePicked(event: Event): void {
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({
            sequence: file
        });
        this.form.get('sequence').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.sequencePreview = reader.result as string;
        };

        reader.readAsDataURL(file);
    }

    onReset(): void {
        this.form.reset({
            content: null,
            sequence: null,
            inputFormat: this.formats[0].value,
            outputFormat: this.formats[2].value
        });
    }

    onDownload($event): void {
        $event.preventDefault();
        $event.stopPropagation();
        console.log('download content');
        this.postsService.download(this.resultPath);
    }

}
