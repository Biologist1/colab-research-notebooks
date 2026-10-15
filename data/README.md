# Dataset information

The research code uses microscopy images with **COCO polygon annotations** and train/validation/test splits.

## Classes
The notebook implementations define **four semantic categories including background**: background, onion, seed and stem.

## Files and permissions
**Raw images, dataset ZIP archives and COCO annotation files are not published in this repository.**

The research workspace contains multiple versions of microscopy datasets, but their provenance, redistribution permission, participant/data sensitivity and final paper-linked release version must be checked before publication.

For a dataset release, document:
- Source and collection procedure
- Annotation protocol and quality control
- Actual class counts and split sizes
- Version identifier and file checksums
- Ownership, license and approved download location

An example of the expected local structure:

```text
dataset/
├── train/
├── valid/
└── test/
```

The precise file arrangement should match the loader code in the published notebooks. No repository asset should be interpreted as permission to redistribute a source dataset.
