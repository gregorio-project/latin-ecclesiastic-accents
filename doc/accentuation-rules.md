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

For this reason, accentuating hymns can only be made by refering to an accentuated hymns corpus, like the one this repository is trying to make available.


## Rules for noting the accent

The following rules describe the way to note accents once we know for sure the syllable quantities. To determine the syllable quantities from the vowel length, see next section. Note that getting the syllable quantities for hymns is almost impossible, see above.

#### Rule 1

Words of one or two syllables have no accent.

Please remember that we are talking here exclusively about accent notation, not the way to prononce Latin, in which words of two syllables are accentuated on the first syllable.

**Option 1:** as an option, words of two syllables can be accentuated on the first syllable (ex. *tíbi*). This choice has been made in Solesmes' *Liber Usualis*, but not in recent editions.


#### Rule 2

If the word ends with an enclitic (*-que*, *-ne* or *-ve*), then the penultimate is accentuated.

Ex: *rŏsăquĕ* → *rosáque*.

NB: This is the current rule but not the only one. For example, in ancient breviaries you can find *decóraque* (Ps 146, 1 in the Vulgate), which corresponds to a different rule: "The enclitic doesn't change the quantity of the penultimate".


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
- *hărŭ-spĕx* → *harúspex*
- *ăntĕ-stō* → *antésto*
- *ăntĭ-stĕs* → *antístes*

Option 3 is usually taken for prose accentuation (ex. *génitrix*, *séptuplum*, *ónagri*, *vólucres*), but inconsistenly in hymns (ex. *intégrum*, *tenébræ* in hymns).


#### Rule 4

If a syllable does not fit in any other rule, then it is short.

Ex:
- *dēsīdĕrō* → *desídero*
- *dēsŭpĕr* → *désuper*
- *cōnfĭtĕor* → *confíteor*


### Case of baptismata (-tum) and charismata (-tum).

These two words are accented on the antepenultimate, just as the greek corresponding shapes (βαπτίσματα, χαρίσματα).

The Goelzer dictionary gives, actually, the form 'charismáta', but the common practice in liturgical books is inclined to favour the form given by the Gaffiot dictionary ('charísmata').


## Rules for the latin accentuation of hebrew proper names.

*(See also the list of all proper names of 3 syllables or more in the Vulgate [here](https://github.com/gregorio-project/latin-ecclesiatic-accents/blob/master/corpus/vulgate_with_accents/vulgate_proper_names.txt).)*


#### • Ab- (in the sense of "father"):
If the 'A' is the antepenultimate, 'Ab-' seems to attract the accent on the 'A' (or to make short the penultimate, which boils down to the same thing). So accent the antepenultimate:
*Abraham, Absalom*


#### • -abad (in the sense of "servant"):
The 'a' is short, so accent the antepenultimate:
*Iózabad, Iézabad*


#### • Abi- (in the sense of "father of" or "my father is"):
If the 'i' is the antepenultimate, 'Abi-' seems to attract the accent on the 'i' (or to make short the penultimate, which boils down to the same thing). So accent the antepenultimate:
*Abínoem, Abísue*


#### • Achi-, Ahi- (in the sense of "brother of"):
If the 'i' is the penultimate, the 'i' is breve. So accent the antepenultimate:
*Achitob, Ahicam*
If the 'i' is the antepenultimate, 'Ahi-' seems to attract the accent on the 'i' (or to make short the penultimate, which boils down to the same thing). So accent the antepenultimate:
*Achítophel, Ahíalon*


#### • -aim:
The 'a' of 'aim' is short, so accent the antepenultimate:
*Ephraim, Ramáthaim, Sephárvaim*


#### • -ath, -eth, -ith seem to make short the penultimate, so accent the antepenultimate:
*Básemath, Hévilath, Iósabeth, Sálomith*


#### • Ben- (in the sense of "son"):
If the 'e' is the antepenultimate, 'Beth-' seems to attract the accent on the 'e' (or to make short the penultimate, which boils down to the same thing). So accent the antepenultimate:
*Bénadad, Béniamin*


#### • Beth- (in the sense of "house"):
If the 'e' is the antepenultimate, 'Beth-' seems to attract the accent on the 'e' (or to make short the penultimate, which boils down to the same thing). So accent the antepenultimate:
*Béthlehem, Béthsimoth, Béthoron*


#### • -ee:
The first 'e' is long, so accent the penultimate:
*Bersabée, Gabée*


#### • Eli- (in the sense of "my God"):
If the 'i' is the antepenultimate, 'Eli-' seems to attract the accent on the 'i' (or to make short the penultimate, which boils down to the same thing). So accent the antepenultimate:
*Elímelech, Elísabeth, Elíada, Elíacim*


#### • -ezer (in the sense of "help"):
The first 'e' is long, so accent the penultimate:
*Eliézer, Ahiézer*


#### • -ia, -ias (in the sense of "the Lord"):
Accent the penultimate:
*Abía, Zacharías, Barachías*


#### • -iel (in the sense of "of God"):
The 'i' of 'iel' is short, so accent the antepenultimate:
*Gábriel, Dániel, Ariel*


#### • -im, -oth (hebrew plural forms) make short the penultimate, so accent the antepenultimate:
*Séraphim, Láomim, Sábaoth, Lápidoth, Anathoth*


#### • Melchi- (in the sense of "king of" or "my king is"):
- If the 'i' is the antepenultimate, 'Melchi-' seems to attract the accent on the 'i' (or to make short the penultimate, which boils down to the same thing). So accent the antepenultimate:
*Melchísedech, Melchísua*
- If the 'i' is the penultimate, it is long. In this case accent the penultimate:
*Melchíram*


### Exceptions(?):
*Bahúrim*

### Rules not yet certain:

#### • Abi-, Achi-, Ahi-, Eli-.
If the 'i' is the penultimate (else see above), sometimes it is short:
*Abiel, Achitob, Eliel*
And sometimes it is long:
*Ahíra, Abíron, Abísag, Elísa*

#### • -ai : ? (*Thólmai, Adonái, Berzellái, Ethai, Chúsai*, several names in Esd ch. 2).

#### • -bee : always -bée? (*Bersabée, Arbée*).

#### • -ia: is sometime one syllabe and sometime not? (*Banáias, Ióiada, Ióiarib, Béniamin*).
