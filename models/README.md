# Model artifacts

This study uses **SegFormer-B0** and **U-Net–ResNet34** for microscopy segmentation.

### Architecture and code
- [SegFormer-B0 training notebook](../research/SegFormer-B0-Microscopy-Segmentation.ipynb)
- [U-Net–ResNet34 training notebook](../research/UNet-ResNet34-Microscopy-Segmentation.ipynb)

### Availability
**Trained model weights are not included** at this stage. The underlying private research workspace contains checkpoint artifacts (for example, PyTorch `.pth` and `.pt` files), but the final selection, accompanying metadata, release conditions and integrity checks remain to be established.

A future public model release should specify the exact training dataset version, task/class mapping, configuration, PyTorch and library versions, intended use, limitations, metrics and checksum. Prefer a tagged release or appropriate model registry for large weights.

Do not claim that a named checkpoint is the final paper model until its experimental provenance has been confirmed.
