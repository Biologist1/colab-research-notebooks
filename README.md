# Computer Vision Research for Microscopy

**Dr. Gülsüm Meço** · Artificial Intelligence · Computer Vision · Microscopy · Educational Technology

This repository presents selected research code on **microscopy image segmentation and prediction-derived morphometry**. The notebooks come from an experimental comparison involving **SegFormer-B0** and **U-Net with a ResNet34 encoder**, as well as downstream measurement of segmented biological structures.

## Research notebooks

| Research implementation | Notebook | Open in Colab |
| --- | --- | --- |
| **SegFormer-B0** — COCO polygon masks, semantic segmentation, training and validation | [SegFormer-B0-Microscopy-Segmentation.ipynb](research/SegFormer-B0-Microscopy-Segmentation.ipynb) | [Open](https://colab.research.google.com/github/Biologist1/colab-research-notebooks/blob/main/research/SegFormer-B0-Microscopy-Segmentation.ipynb) |
| **U-Net–ResNet34** — semantic segmentation, training, validation and checkpoints | [UNet-ResNet34-Microscopy-Segmentation.ipynb](research/UNet-ResNet34-Microscopy-Segmentation.ipynb) | [Open](https://colab.research.google.com/github/Biologist1/colab-research-notebooks/blob/main/research/UNet-ResNet34-Microscopy-Segmentation.ipynb) |
| **Microscopy Morphometry** — model predictions and quantitative morphology analysis | [Microscopy-Morphometry.ipynb](research/Microscopy-Morphometry.ipynb) | [Open](https://colab.research.google.com/github/Biologist1/colab-research-notebooks/blob/main/research/Microscopy-Morphometry.ipynb) |

### Study scope

- **Specimens:** onion cells, seed tissue and stem tissue, using a COCO-annotated microscopy dataset.
- **Segmentation methods:** transformer-based SegFormer-B0 and convolutional U-Net–ResNet34.
- **Morphometric analysis:** measurements derived from predicted segmentation masks; analysis includes area, perimeter, equivalent diameter, aspect ratio, eccentricity, circularity, solidity and extent.

## Reproduction and data availability

These notebooks are **research implementations**, not a complete public dataset release. Source image data, COCO annotations, checkpoints and model weights are not included.

The U-Net notebook expects masks prepared with the SegFormer data-preparation procedure. Notebook paths may need adjustment for an independent environment. Outputs were removed prior to publication; **the published versions have not been re-executed end to end**, so no benchmark or performance claims are made in this README.

## Researcher profiles

- [Academic GitHub profile](https://github.com/Biologist1)
- [Kaggle](https://www.kaggle.com/glsmmeo)
- [Meço Digital Academy](https://mecodijitalakademi.com/)

---
*Research code shared for scholarly inspection. Please cite the associated publication when available; data and model-weight redistribution rights are not granted by this repository.*
