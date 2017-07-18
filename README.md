# Introduction

This is a project that is designed at automating the process of adding furigana while typing out Japanese. This is intended for use in Discord however it should be fairly easy to implement in other environments if you can get Kuromoji working (and indeed I did most of the development on the browser).

In order to use this within Discord, you have to install BetterDiscord to add it as a plugin. Discord is an electron app which means it is Chrome and Node combined into one. BetterDiscord additionally also uses JQuery by default; it will call 'new' on the the plugin function.

# Method

Thus far, have come across two ideas to implement this.

1. Use a Japanese morphological analyzer to recover the readings from the final converted sentences.

2. To simulate an IME within discord itself. (Have mozc dictionaries downloaded, lots of math and work to go into)

I'm currently taking the first approach of using a morphlogical analyzer. I have all the basic functionality working in the browser test environment. When migrating to Better Discord, still need to get Kuromoji to import the dictionaries properly and workout the final text replacement.

# To Do

Algorithm-related
- Kuromoji unable to find the directory for dictionaries. Unsure what is the home directory for better discord. Note: Interaction with directory pathing and WebPack may be a bit funky.
- Final text replacement once Ctrl+C is triggered.
- If cannot fix Kuromoji dictionary pathing, consider bundling dictionaries with kuromoji code proper (already have fork prepared)

Extra
- Add JQuery as external dependancy to WebPack.
- Preferance files.
- May want to swap to bower instead of webpack since the way I get around WebPack's module code is rather jankey for use in Better Discord.

# Research

- Morphlogical Analyzers mecab, kuromoji, kagome, janome
- [Kuromoji.js Demo](http://takuyaa.github.io/kuromoji.js/demo/tokenize.html)
- mozc & anthy.js
- [Kuromoji.js source](view-source:http://takuyaa.github.io/kuromoji.js/demo/kuromoji/build/kuromoji.js) for 
- [KawaiiDiscord](https://github.com/noodlebox/KawaiiDiscord/blob/master/package.json) for a plugin example that uses bower for BetterDiscord
- mozc dictionaries have a bunch of numbers associated with each word. Looking at the mecab/kuromoji(main) dictionaries may be enlightening as to what these numbers mean.

# Licensing Stuff

kuromojijs
Mecab from kuoromji