# Research code usage guide

These notebooks are shared for transparent inspection of the research implementation. They are **not a turnkey, verified replication package**: dataset assets and some saved checkpoints are not published here.

## 1. Environment
- Python and Jupyter/Google Colab.
- CUDA-capable NVIDIA GPU recommended for training.
- Libraries used in the notebooks: `torch`, `torchvision`, `numpy`, `Pillow`, `pycocotools`, `transformers`, `segmentation-models-pytorch`, `timm`, `pandas`, `scikit-image`, `scipy`.
- Install a **PyTorch build compatible with your CUDA environment** before installing the remaining dependencies. Library versions are not locked in the original experiments.

## 2. Data prerequisites
Prepare a local **COCO-style** polygon-annotated microscopy dataset, with `train`, `valid` and `test` splits. The code refers to a Colab-style directory such as `/content/own_polygonal_39` and expects the associated image and annotation structures.

See [Data availability](../data/README.md). Input data are **not** included.

## 3. SegFormer-B0
Open [SegFormer-B0-Microscopy-Segmentation.ipynb](../research/SegFormer-B0-Microscopy-Segmentation.ipynb). The research implementation uses `nvidia/segformer-b0-finetuned-ade-512-512` as the initialization checkpoint, a 4-class output (including background), and foreground Dice for validation. The original configuration includes:
- seed: **42**
- batch size: **2**
- learning rate: **6e-5**
- maximum training epochs: **50**

Review filesystem and Google Drive checkpoint paths before execution. Dataset images must be made available separately.

## 4. U-Net–ResNet34
Open [UNet-ResNet34-Microscopy-Segmentation.ipynb](../research/UNet-ResNet34-Microscopy-Segmentation.ipynb). This workflow expects semantic mask files prepared with the SegFormer data-preparation process. It uses the `segmentation_models_pytorch` U-Net implementation with a ResNet34 encoder. Its initial seed, batch size, learning rate and maximum epochs match the above experiment.

## 5. Morphometry
Open [Microscopy-Morphometry.ipynb](../research/Microscopy-Morphometry.ipynb). This notebook contains additional data-loading and image-measurement code for prediction-derived morphology, including measurements from segmentation masks.

## 6. Reproducibility cautions
- **Do not treat notebook outputs or metrics as independently reproduced results.** Execution outputs were removed before publication.
- Set dataset and checkpoint paths for your environment before running.
- Confirm that dataset licensing and institutional permissions allow your use.
- Report exact package versions, hardware, run seeds, splits and validation metrics when publishing experimental results.
- Do not commit API credentials, personal information, unpublished data or large model-weight files without a deliberate publication review.
