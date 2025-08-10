
# ReproNLP 2025 App for surveys

Simple Next.js app that uses [Vercel KV for Redis](https://vercel.com/kv).

This repository is associated with our [paper](https://aclanthology.org/2025.gem-1.53.pdf) _"ReproHum #0033-05: Human Evaluation of Factuality from A Multidisciplinary Perspective"_ for [ReproNLP 2025](https://repronlp.github.io/), part of the [ReproHum project](https://reprohum.github.io/), co-located with the [GEM² workshop](https://gem-benchmark.com/workshop) at [ACL 2025](https://2025.aclweb.org/).

You can find our poster [here](https://assets.underline.io/lecture/124291/poster_document/446eeef79379198b874e806c1749ba29.pdf).


### Setup

We use [pnpm](https://pnpm.io/installation) for package installation:

```bash
pnpm install
```

Once that's done, copy the .env.example file in this directory to .env.local (which will be ignored by Git):

```bash
cp .env.example .env.local
```

Then open `.env.local` and set the environment variables to match the ones in your Vercel Storage Dashboard.

Next, run Next.js in development mode:

```bash
pnpm dev
```

### Citation

If you found this work helpful, please cite our paper:

```bib
@inproceedings{florescu-etal-2025-reprohum,
    title = "{R}epro{H}um {\#}0033-05: Human Evaluation of Factuality from A Multidisciplinary Perspective",
    author = "Florescu, Andra-Maria  and
      Micluța-C{\^a}mpeanu, Marius  and
      Tabusca, Stefana Arina  and
      Dinu, Liviu P",
    editor = "Dhole, Kaustubh  and
      Clinciu, Miruna",
    booktitle = "Proceedings of the Fourth Workshop on Generation, Evaluation and Metrics (GEM{\texttwosuperior})",
    month = jul,
    year = "2025",
    address = "Vienna, Austria and virtual meeting",
    publisher = "Association for Computational Linguistics",
    url = "https://aclanthology.org/2025.gem-1.53/",
    pages = "583--589",
    ISBN = "979-8-89176-261-9",
    abstract = "The following paper is a joint contribution for the 2025 ReproNLP shared task, part of the ReproHum project. We focused on reproducing the human evaluation based on one criterion, namely, factuality of Scientific Automated Generated Systems from August et al. (2022). In accordance to the ReproHum guidelines, we followed the original study as closely as possible, with two human raters who coded 300 ratings each. Moreover, we had an additional study on two subsets of the dataset based on domain (medicine and physics) in which we employed expert annotators. Our reproduction of the factuality assessment found similar overall rates of factual inaccuracies across models. However, variability and weak agreement with the original model rankings suggest challenges in reliably reproducing results, especially in such cases when results are close."
}
```
