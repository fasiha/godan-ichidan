# Godan-Ichidan

Japanese verbs fall into two broad categories, <ruby>五段<rt>godan</rt></ruby> and <ruby>一段<rt>ichidan</rt></ruby>. See [Wikipedia's article](https://en.wikipedia.org/wiki/Japanese_godan_and_ichidan_verbs) for some details, which talks about heuristics for classifying a verb in dictionary form into one or the other. For accuracy, I ususually consult a dictionary like https://jisho.org (based on the JMdict project) or this information comes out of a Japanese NLP (natural language processing) parser like MeCab, both of which are involved tasks.

Sometimes you just want to check if a Japanese verb in dictionary form is godan or ichidan. This dependency-free JavaScript library does just that one thing. It exports a function that
- accepts a string and
- returns `godan`, `ichidan`, or `both` (because sometimes you can't tell, like <ruby>きる<rt>kiru</rt></ruby>),
- which is *guaranteed to be right* for *every* godan and ichidan verb in [JMdict](https://en.wikipedia.org/wiki/JMdict).

Of course the dictionary contains verbs that are neither, e.g., zuru verbs like [<ruby>演ずる<rt>enzuru</rt></ruby>](https://jisho.org/search/演ずる) or archaic nidan verbs. This library can easily be wrong for those, as well as for any other input that JMdict doesn't list as an ichidan or godan verb. Therefore, your input has to be in kanji or hiragana (not roumaji).

In order to do this, this library uses quick heuristics (does it end in <ruby>る<rt>ru</rt></ruby>? Does it rhyme with <ruby>いる<rt>iru</rt></ruby> or <ruby>える<rt>eru</rt></ruby>?) and then just exhaustively enumerates the 300-700 exceptions.

All that dictionary analysis has already been done for you. Before this library gets shipped, that data gets updated with the latest JMdict available.

Therefore, when you import this library and run its one exported function, it just checks a couple of sets before returning the answer. It should be pretty fast. But for the same reason, this library is kind of bulky (34 kb, which becomes 7 kb after gzip).

## Usage
- install: `npm i godan-ichidan`
- TypeScript/browser/Node.js ES modules: `import godanIchidan from 'godan-ichidan'`
- Node REPL: `const godanIchidan = (await import('godan-ichidan')).default`
- Node CommonJS: `const godanIchidan = require('godan-ichidan')`
- Browser `<script>` tag: download [`godanIchidan.min.js`](./dist/godanIchidan.min.js) and `<script src="godanIchidan.min.js"></script>` (don't forget to also download the [sourcemap](./dist/godanIchidan.min.js.map))

Then:
```
> godanIchidan('いく')
'godan'
> godanIchidan('食べる')
'ichidan'
> godanIchidan('きる')
'both'
```

## Dev
- `npm run download` will download the latest [JMdict-Simplified](https://github.com/scriptin/jmdict-simplified) JSON
- `npm run analysis` will crawl the dictionary and generate the required lists of verbs
- `npm run validate` or `npm test` will exercise the library by checking it against every single verb in JMdict
- `npm run build` uses ESbuild to convert my horrible code to ESM and 

If `npm run download` doesn't work (it uses `curl` and `jq`, which maybe you don't have installed), here are manual instructions:
1. Go to https://github.com/scriptin/jmdict-simplified/releases
2. Download the most recent "jmdict-eng" tgz or zip
3. Uncompress the download and put the JSON in this directory.

The version of this package should include the date that the original JMdict XML file was downloaded and consumed by JMdict-Simplified (it's also included in `dictDate.js`). This can be important because JMdict is constantly undergoing revisions and for example, the 2023-04-03 version has 猿猴が月を取る as an ichidan verb but on 2023-04-04 it was corrected to be godan (see [JMdict raw entry](http://www.edrdg.org/jmdictdb/cgi-bin/entr.py?svc=jmdict&sid=&q=2848071.1)).
