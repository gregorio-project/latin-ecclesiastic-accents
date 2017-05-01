# Liturgical accentuation rules

## Introduction

This document summarizes the rules to correctly place the noted acute accent in liturgical latin texts. It does not say anything about the phonological accentuation, only the written one.

#### Sources

There is no official document from the Vatican on this matter, the main sources are:

- the Vatican editions, copied by Solesmes, for instance *Te decet hymnus* by Anselmo Lentini
- W.S. Allen: *Vox Latina – A Guide to the Pronunciation of Classical Latin*, chapter 6
- R. Morisset: *Précis de grammaire des lettres latines*, chapter 9
- L. Quicherat: *Nouvelle prosodie latine*, chapter V (available [online](http://gallica.bnf.fr/ark:/12148/bpt6k58467165))
- the [PedeCerto project](http://www.pedecerto.eu/)

#### Vocabulary

Following W.S. Allen and R. Morisset, we distinguish the length of a vowels from the quantity of a syllable.

#### General considerations

Placing accents on a text is not an easy task. It depends on syllable quantities, depending on vowel length; and vowel length are not the same accross regions and periods. So a particular text may use vowel length differing from those one can find in a dictionnary such as the *Dictionnaire Illustré Latin-Français* by Félix Gaffiot or the Lewis & Short *A Latin Dictionary*. 

As an example of such discrepancy, the word *Moyses* is given with a diphtongue *oy* in *L&S*, while in liturgical texts it is a long *o* followed by a short *y* in two different syllables. In this case, there would be no accents according to *L&S* (because the word is two syllables only), and it would be accented *Móyses* in a liturgical book.

#### The case of liturgic hymns

Accents cannot be determined automatically for verses (which is not specific to liturgical Latin), because:

- poetic licenses may merge some sequence of vowels from different syllabes into diphtongues or triphtongues ([cuius](http://www.pedecerto.eu/lessico/lessico/check/C_CU_11#ancoraQuery) for instance)
- so called "common" or "neuter" vowels may be short or long according to the metrics, for instance tenébræ in most hymns, while ténebræ in prose
- hymns are usually written in vulgar Latin, where vowel length and diphtongues are not the same as in classical Latin, for instance *cui* is a diphtongue in most hymns while composed of two syllables in prose

For this reason, accentuating hymns can only be made by refering to an accentuated hymns corpora, like the one this repository is trying to make available.


## Rules for noting the accent

The following rules describe the way to note accents once we know for sure the syllable quantities. To determine the syllable quantities from the vowel length, see next section. Note that getting the syllable quantities for hymns is almost impossible, see above.

#### Rule 1

Words of one or two syllables have no accent. 

Please remember that we are talking here exclusively about accent notation, not the way to prononce Latin, in which words of two syllables are accentuated on the first syllable.

**Option 1:** as an option, words of two syllables can be accentuated on the first syllable (ex. *tíbi*). This choice has been made in Solesmes' *Liber Usualis*, but not in recent editions.


#### Rule 2

If the word ends with an enclitic (*-que*, *-ne* or *-ve*), then the penultimate is accentuated.

Ex: *rŏsăquĕ* → *rosáque*.


#### Rule 3

If the penultimate syllable is long by nature or by position, then it carries the accent.

Ex: *excélsis*.


#### Rule 4

If the penultimate syllable is not long by nature or by position, the antepenultimate syllable carries the accent.

Ex: *desídero*.


#### Rule 5

In case a dipthongue is present in the syllable, the main vowel is accentuated.

Ex: *quóniam*, *adiútor*, *áuribus*.


#### Option 2

As an option, if a words starts by an upper-cased letter and the first letter is the one carrying the accent, the accent is not noted.

Ex: *Israel*.

This option is used by Solesmes, but does not have other justification than Solesmes being used to it.


## Determining the quantity of a syllable

These rules show how to determine the quantity of a syllable from the length of the vowels.

#### Rule 1

If the syllable contains a long vowel, then the syllable is long by nature.

Ex:
*excūsātŏr* → *excusátor*
*lăvācrŭm* → *lavácrum*
*cāndēlābrŭm* → *candelábrum*


#### Rule 2

If the syllable contains a dipthongue, then it is long by nature.

Ex: *Hĕbræī* → *Hebrǽi*.


#### Rule 3

If the syllable does not contain a long vowel or a dipthongue, then if its last vowel is followed by:

- x, z or a semi-consonantic i
- two consonnants, except:
  - ch, th, ph
  - pr, tr, cr, br, dr, gr, fr, pl, tl, cl, bl, dl, gl, fl (Option 3)

then the syllable is long by position.

Ex: 
- *crŭcīfīxus* → *crucifíxus*
- *alicúius*
- *thēsaurizō* → *thesaurízo*
- *exstinguō* → *exstínguo*
- *călăthus* → *cálathus*

Option 3 is usually taken for prose accentuation (ex. *génitrix*, *séptuplum*, *ónagri*, *vólucres*), but inconsistenly in hymns (ex. *intégrum*, *tenébræ* in hymns).


#### Rule 4

If a syllable does not fit in any other rule, then it is short.

Ex: 
- *dēsīdĕrō* → *desídero*
- *dēsŭpĕr* → *désuper*
- *cōnfĭtĕor* → *confíteor*











