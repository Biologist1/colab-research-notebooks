# Experiment configurations and reproducibility notes

This file documents **parameters present in the published research notebooks**; it does **not** claim independently verified benchmark performance.

| Item | SegFormer-B0 | U-Net–ResNet34 |
|---|---|---|
| Task | 4-class semantic segmentation (including background) | 4-class semantic segmentation (including background) |
| Model implementation | Hugging Face `SegformerForSemanticSegmentation` | `segmentation_models_pytorch.Unet` |
| Initialization | `nvidia/segformer-b0-finetuned-ade-512-512` | ResNet34 encoder |
| Seed in notebook | 42 | 42 |
| Batch size | 2 | 2 |
| Learning rate | 6e-5 | 6e-5 |
| Maximum epochs | 50 | 50 |
| Dataset | COCO-derived microscopy semantic masks | Derived semantic masks compatible with the SegFormer preprocessing |
| Validation | Foreground macro Dice | Foreground macro Dice |
| GPU | CUDA if available, otherwise CPU | CUDA if available, otherwise CPU |

The morphometry notebook incorporates additional mask-based metrics and training/evaluation steps; see [research/Microscopy-Morphometry.ipynb](../research/Microscopy-Morphometry.ipynb).

## Provenance to record with every published result

- Dataset version, annotation version and train/validation/test sizes
- Actual selected checkpoint and hash
- Training/validation curve and best epoch
- Per-class Dice/IoU (plus an explicit averaging policy)
- Sample IDs and source permission for representative microscopy figures
- Machine/GPU and package versions
- Morphometric unit calibration and measurement definitions

## Results availability

**No numerical results are reproduced in this document.** Experimental data and figures will be attached only after checking provenance and redistribution permission. Avoid treating an unverified Colab log or draft figure as a validated publication result.
