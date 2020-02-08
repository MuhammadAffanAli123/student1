#!/usr/bin/python
from Bio import SeqIO, AlignIO, Seq
from Bio.Alphabet import generic_dna, generic_protein

import os
import glob
import sys

""" Fasta """
def fasta_to_pir(input="./files/input/example.fasta", output="./files/output/fasta-pir.pir"):
    return SeqIO.convert(input, "fasta", output, "pir")

def fasta_to_genbank(input="./files/input/example.fasta", output="./files/output/fasta-genbank.genbank"):
    input_handle = open(input, "r")
    output_handle = open(output, "w")

    sequences = list(SeqIO.parse(input_handle, "fasta"))

    #asign generic_dna or generic_protein
    for seq in sequences:
        seq.seq.alphabet = generic_dna

    count = SeqIO.write(sequences, output_handle, "genbank")

    output_handle.close()
    input_handle.close()
    return count
    
def fasta_to_seqxml(input="./files/input/example.fasta", output="./files/output/fasta-seqxml.seqxml"):
    tmp = "./files/tmp.genbank"
    fasta_to_genbank(input, tmp)
    lines = genbank_to_seqxml(tmp, output)
    os.remove(tmp)
    return lines

""" Fastq """
def fastq_to_fasta(input="./files/input/example.fastq", output="./files/output/fastq-fasta.fasta"):
    return SeqIO.convert(input, "fastq", output, "fasta")

def fastq_to_pir(input="./files/input/example.fastq", output="./files/output/fastq-pir.pir"):
    return SeqIO.convert(input, "fastq", output, "pir")
    
def fastq_to_genbank(input="./files/input/example.fastq", output="./files/output/fastq-genbank.genbank"):
    tmp = "./files/tmp.fasta"
    fastq_to_fasta(input, tmp)
    lines = fasta_to_genbank(tmp, output)
    os.remove(tmp)
    return lines
    
def fastq_to_phylip(input="./files/input/example.fastq", output="./files/output/fastq-phylip.phylip"):
    return SeqIO.convert(input, "fastq", output, "phylip-relaxed")
    
def fastq_to_qual(input="./files/input/example.fastq", output="./files/output/fastq-qual.qual"):
    return SeqIO.convert(input, "fastq", output, "qual")

""" PIR """
def pir_to_fasta(input="./files/input/example.pir", output="./files/output/pir-fasta.fasta"):
    return SeqIO.convert(input, "pir", output, "fasta")

def pir_to_phylip(input="./files/input/example.pir", output="./files/output/pir-phylip.phylip"):
    return SeqIO.convert(input, "pir", output, "phylip")

def pir_to_genbank(input="./files/input/example.pir", output="./files/output/pir-genbank.genbank"):
    return SeqIO.convert(input, "pir", output, "genbank")

def pir_to_seqxml(input="./files/input/example.pir", output="./files/output/pir-seqxml.seqxml"):
    return SeqIO.convert(input, "pir", output, "seqxml")


""" Phylip """
def phylip_to_fasta(input="./files/input/example.phylip", output="./files/output/phylip-fasta.fasta"):
    return SeqIO.convert(input, "phylip", output, "fasta")

def phylip_to_genbank(input="./files/input/example.phylip", output="./files/output/phylip-genbank.genbank"):
    tmp = "./files/tmp.fasta"
    phylip_to_fasta(input, tmp)
    lines = fasta_to_genbank(tmp, output)
    os.remove(tmp)
    return lines

def phylip_to_pir(input="./files/input/example.phylip", output="./files/output/phylip-pir.pir"):
    return SeqIO.convert(input, "phylip", output, "pir")

""" PDB """
def pdb_to_fasta(input="./files/input/example.pdb-seqres", output="./files/output/pdb-fasta.fasta"):
    return SeqIO.convert(input, "pdb-seqres", output, "fasta")

def pdb_to_pir(input="./files/input/example.pdb-seqres", output="./files/output/pdb-pir.pir"):
    return SeqIO.convert(input, "pdb-seqres", output, "pir")


def pdb_to_genbank(input="./files/input/example.pdb-seqres", output="./files/output/pdb-genbank.genbank"):
    return SeqIO.convert(input, "pdb-seqres", output, "genbank")

""" GENBANK """
def genbank_to_fasta(input="./files/input/example.genbank", output="./files/output/genbank-fasta.fasta"):
    return SeqIO.convert(input, "genbank", output, "fasta")

def genbank_to_pir(input="./files/input/example.genbank", output="./files/output/genbank-pir.pir"):
    return SeqIO.convert(input, "genbank", output, "pir")

def genbank_to_seqxml(input="./files/input/example.genbank", output="./files/output/genbank-seqxml.seqxml"):
    return SeqIO.convert(input, "genbank", output, "seqxml")

""" SEQXML """

""" QUAL """
def qual_to_fasta(input="./files/input/example.qual", output="./files/output/qual-fasta.fasta"):
    return SeqIO.convert(input, "qual", output, "fasta")

def qual_to_fastq(input="./files/input/example.qual", output="./files/output/qual-fastq.fastq"):
    return SeqIO.convert(input, "qual", output, "fastq")


def clear_folder(folder="./files/output"):
    files = glob.glob('/YOUR/PATH/*')
    for f in files:
        os.remove(f)

def run_all():
    clear_folder()

    fasta_to_pir()
    fasta_to_genbank()
    fasta_to_seqxml()
    fastq_to_fasta()
    fastq_to_pir()
    fastq_to_genbank()
    fastq_to_phylip()
    fastq_to_qual()
    pir_to_fasta()
    pir_to_phylip()
    pir_to_genbank()
    pir_to_seqxml()
    phylip_to_fasta()
    phylip_to_genbank()
    phylip_to_pir()
    pdb_to_fasta()
    pdb_to_pir()
    pdb_to_genbank()
    genbank_to_fasta()
    genbank_to_pir()
    genbank_to_seqxml()
    qual_to_fasta()
    qual_to_fastq()
    
    clear_folder()
    print('DONE!')
    return 1





def help():
        print('Usage: python converter.py METHOD INPUT_PATH OUTPUT_PATH')
        print("For METHOD choose one of the following: fasta_to_pir \n fasta_to_phylip \n fasta_to_genbank \n fasta_to_seqxml \n fastq_to_fasta \n fastq_to_pir \n fastq_to_genbank \n fastq_to_phylip \n fastq_to_qual \n pir_to_fasta \n pir_to_phylip \n pir_to_genbank \n pir_to_seqxml \n phylip_to_fasta \n phylip_to_genbank \n phylip_to_pir \n pdb_to_fasta \n pdb_to_pir \n pdb_to_genbank \n genbank_to_fasta \n genbank_to_phylip \n genbank_to_pir \n genbank_to_seqxml \n qual_to_fasta \n qual_to_fastq \n")


def main():
        if len(sys.argv) != 4:
                help()
        else:
                method = sys.argv[1]
                input = sys.argv[2]
                output = sys.argv[3]
                if method == "fasta_to_pir":
                        fasta_to_pir(input, output)
                elif method == "fasta_to_genbank":
                        fasta_to_genbank(input, output)
                elif method == "fasta_to_seqxml":
                        fasta_to_seqxml(input, output)
                elif method == "fastq_to_fasta":
                        fastq_to_fasta(input, output)
                elif method == "fastq_to_pir":
                        fastq_to_pir(input, output)
                elif method == "fastq_to_genbank":
                        fastq_to_genbank(input, output)
                elif method == "fastq_to_phylip":
                        fastq_to_phylip(input, output)
                elif method == "fastq_to_qual":
                        fastq_to_qual(input, output)
                elif method == "pir_to_fasta":
                        pir_to_fasta(input, output)
                elif method == "pir_to_phylip":
                        pir_to_phylip(input, output)
                elif method == "pir_to_genbank":
                        pir_to_genbank(input, output)
                elif method == "pir_to_seqxml":
                        pir_to_seqxml(input, output)
                elif method == "phylip_to_fasta":
                        phylip_to_fasta(input, output)
                elif method == "phylip_to_genbank":
                        phylip_to_genbank(input, output)
                elif method == "phylip_to_pir":
                        phylip_to_pir(input, output)
                elif method == "pdb_to_fasta":
                        pdb_to_fasta(input, output)
                elif method == "pdb_to_pir":
                        pdb_to_pir(input, output)
                elif method == "pdb_to_genbank":
                        pdb_to_genbank(input, output)
                elif method == "genbank_to_fasta":
                        genbank_to_fasta(input, output)
                elif method == "genbank_to_pir":
                        genbank_to_pir(input, output)
                elif method == "genbank_to_seqxml":
                        genbank_to_seqxml(input, output)
                elif method == "qual_to_fasta":
                        qual_to_fasta(input, output)
                elif method == "qual_to_fastq":
                        qual_to_fastq(input, output)
                else:
                        print("Unkown method")


if __name__ == "__main__":
    main()
