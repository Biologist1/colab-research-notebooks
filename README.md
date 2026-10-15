# AI-Assisted Microscopy: Segmentation and Morphometry

**Dr. Gülsüm Meço**  
*Computer vision · Deep learning · Microscopy image analysis · Educational technology*

A research repository documenting a microscopy image-analysis workflow with **SegFormer-B0**, **U-Net–ResNet34**, and **prediction-derived morphometric measurements**.

The repository is organized to make both the **implementation and its scientific context** inspectable. The research code is public; unreleased datasets, trained weights and unverified results are deliberately not presented as public artifacts.

## Repository structure

```text
colab-research-notebooks/
├── research/       # SegFormer, U-Net and morphometry notebooks
├── docs/           # Project description and tutorial
├── experiments/    # Verified hyperparameters and experiment notes
├── results/        # Results release status and measurement definitions
├── figures/        # Publication figures (pending approved assets)
├── models/         # Model artifact documentation (weights not yet released)
├── data/           # Dataset description and access conditions
├── .gitignore      # Protects credentials and local research files
├── CITATION.cff     # Citation metadata
└── README.md
```

## Research notebooks

| Study | Code | Run in Colab |
|---|---|---|
| **SegFormer-B0** — Semantic segmentation | [Notebook](research/SegFormer-B0-Microscopy-Segmentation.ipynb) | [Open in Colab](https://colab.research.google.com/github/Biologist1/colab-research-notebooks/blob/main/research/SegFormer-B0-Microscopy-Segmentation.ipynb) |
| **U-Net–ResNet34** — Semantic segmentation | [Notebook](research/UNet-ResNet34-Microscopy-Segmentation.ipynb) | [Open in Colab](https://colab.research.google.com/github/Biologist1/colab-research-notebooks/blob/main/research/UNet-ResNet34-Microscopy-Segmentation.ipynb) |
| **Microscopy morphometry** — Model predictions and quantitative analysis | [Notebook](research/Microscopy-Morphometry.ipynb) | [Open in Colab](https://colab.research.google.com/github/Biologist1/colab-research-notebooks/blob/main/research/Microscopy-Morphometry.ipynb) |

## Scientific documentation

- **[Project overview](docs/PROJECT_OVERVIEW.md):** objective, scope and workflow.
- **[Tutorial](docs/TUTORIAL.md):** dependencies, data requirements and execution order.
- **[Experiment configurations](experiments/CONFIGURATIONS.md):** documented model parameters and research metadata.
- **[Results](results/README.md):** measurements and current release status.
- **[Figures](figures/README.md):** provenance requirements for scientific illustrations.
- **[Models](models/README.md):** architectures and checkpoint-release conditions.
- **[Dataset](data/README.md):** COCO annotation format, classes and data availability.

### Technical scope

The notebooks include COCO polygon annotation processing, semantic-mask preparation, model training, foreground Dice evaluation, and morphometric measurements from predicted masks. Configurations in the original research notebooks include a seed of 42, batch size of 2, learning rate of 6e-5 and a maximum of 50 epochs for the two model-training implementations.

**Research transparency:** Source image/annotation archives, trained weights and verified publication-ready figures are not yet released. The public notebooks have not been independently re-executed end-to-end, and no quantitative performance claims are made by this README. See the documentation for details.

## About the researcher

- [GitHub profile](https://github.com/Biologist1)
- [Kaggle](https://www.kaggle.com/glsmmeo)
- [Meço Digital Academy](https://mecodijitalakademi.com/)

*For scholarly use, consult the documentation, check data provenance, and cite the project via [CITATION.cff](CITATION.cff).*
