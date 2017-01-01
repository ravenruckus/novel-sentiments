
"""
Created on Sun Dec  4 16:08:05 2016

@author: aliciagyori
"""

import pandas as pd
from textblob import TextBlob
from gutenberg.acquire import load_etext
from gutenberg.cleanup import strip_headers
import json


#gets sentences
def abstract(novelNum):
    novel = strip_headers(load_etext(novelNum))
    novel = novel.replace('\n', ' ')
    novel= TextBlob(novel)
    novel_sentences = novel.sentences
    return novel_sentences;


#puts sentences into dataframe
def dataFrame(novel_sentences):
    arrSentences = [];
    for l in novel_sentences:
        arrSentences.append(str(l));
    return pd.DataFrame(arrSentences, columns=["Sentences"]);


#put sentence through here to get total number of characters and array of word lengths
def wrdSize(sentence):
    total_chars = 0
    wrd_counts = []
    for word in sentence:
        char_count = len(word)
        wrd_counts.append(char_count)
        total_chars += char_count
    wrd_length.append(wrd_counts)
    total_char.append(total_chars)


def lengthsColumns(sentenceColumn):
    for l in sentenceColumn:
        sent = TextBlob(l)
        wrdSize(sent.words)


def detectSentiment(text):
    return TextBlob(text.decode('utf-8')).sentiment.polarity


def start_stop(df):
    t = 0
    x = 0
    start_point = []
    stop_point = []
    for n in range(1,20):
        s = find_this(df, t, x)
        start_point.append(t)
        stop_point.append(s)
        t = s
        x = s + 1
    start_point.append(stop_point[18])
    stop_point.append(len(df))
    return start_point, stop_point


def find_this(df, t, x):
    ratio = (df["total_char"].sum()/20) - (.02 * (int(len(df) - 1)))
    w = 0
    sent_stop = []
    while w <= ratio:
        w = df["total_char"][t:x].sum()
        sent_stop.append(x)
        x += 1
    return max(sent_stop)


def sentence_dict(df):
    sentence_pieces = []
    start_point, stop_point = start_stop(df)
    for l in range(0,20):
        d = {}
        sr = start_point[l]
        st = stop_point[l]
        r = df["sentiment"][sr:st].mean()
        st = df["Sentences"][sr:st]
        arr = []
        for l in st:
            arr.append(l)
        d["sent_score"] = r
        d["sentences"] = arr
        sentence_pieces.append(d)
    return sentence_pieces


def dictJson(novel_df, Title, number):
    novel_dict = sentence_dict(novel_df)
    d = {};
    d["Title"] = Title;
    d['id'] = number;
    d["pieces"] = novel_dict;
    with open("data/_" + str(number) + ".txt", "w") as outfile:
        json.dump(d, outfile)
    return d




def novel(novel_number):
    novel_sentences = abstract(novel_number)
    novel_df = dataFrame(novel_sentences)
    lengthsColumns(novel_df["Sentences"])
    novel_df["wrd_length"] = wrd_length
    novel_df["total_char"] = total_char
    novel_df["sentiment"] = novel_df["Sentences"].apply(detectSentiment)
    return novel_df



def main(novel_num, Title):
    novel_df = novel(novel_num)
    dictJson(novel_df, Title, novel_num)


novels = [["Alice in Wonderland", 11], ["Pride and Prejudice", 1342], ["Frankenstein", 84], ["Dracula", 345], ["Wizard of Oz", 55], ["The Jungle Book", 236]]
for l in novels:
    wrd_length = [];
    total_char = [];
    main(l[1], l[0])
