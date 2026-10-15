# Project overview

## Microscopy image segmentation and morphometry

**Researcher:** Dr. Gülsüm Meço  
**Research domain:** AI-assisted microscopy, image analysis and quantitative morphometry.

### Scientific objective
Evaluate computer-vision workflows for segmenting biological structures in microscopy images and extracting morphology from model predictions. This repository provides research code and documentation for SegFormer-B0 and U-Net–ResNet34.

### Implemented workflow
1. Prepare microscope images and COCO polygon annotations for **background, onion, seed and stem** classes.
2. Generate semantic masks and training/validation/test datasets.
3. Train a **SegFormer-B0** semantic-segmentation model.
4. Train a **U-Net–ResNet34** model using compatible masks.
5. Evaluate segmentation with foreground Dice and related mask-overlap measurements.
6. Compute mask-derived morphometric measurements.

### Code and status
The [SegFormer notebook](../research/SegFormer-B0-Microscopy-Segmentation.ipynb) and [U-Net notebook](../research/UNet-ResNet34-Microscopy-Segmentation.ipynb) contain the original research implementations in editable Jupyter format.

The [morphometry notebook](../research/Microscopy-Morphometry.ipynb) includes end-to-end exploratory code for training, predictions and morphological assessment.

**Publication status:** Code is public; raw images, annotation archives, trained weights and completed experimental figures have not yet been approved for public release. The included notebooks have not been independently re-executed end-to-end in this public repository. No result metrics are claimed in this document.

See [TUTORIAL.md](TUTORIAL.md) for usage prerequisites and [data](../data/README.md) for data availability.
