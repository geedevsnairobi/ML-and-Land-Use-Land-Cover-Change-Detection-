# Land Use Land Cover Change Detection

<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Geethen/geeml">
    <img src="./images/GEEDEVSNairobi.png" alt="Logo" width="400" height="400">
  </a>

<h3 align="center">GEE Developers-Nairobi</h3>

  <p align="center">
    A python package to extract gee data for machine learning.
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">Problem Statement</a>
    </li>
    <li>
      <a href="#Case Study">LULC-Case Study (Kisumu East)</a>
    </li>
    <li>
      <a href="#Project Work Flow">Project Work Flow</a>
      <ul>
        <li><a href="#Step 1.">Step 1. Data collection and preprocessing</a></li>
      </ul>
    </li>
    <li><a href="#usage">Basic Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
This python package makes it easier to extract satellite data from Google Earth Engine using parallel processing and the Google Earth Engine high volume end point.

In its current state it supports the extraction of data for traditional machine learning (tabular data) in the form of csv's and the extraction of GeoTiff image patches for Deep Neural Networks.

#### Motivation
The Machine learning capabilities in the GEE JS code editor remain limited. For example, there is no support for XGBoost, LightGBM, NGBoost, etc. Moreover, the python ecosystem has much more support for training, valdation and hyperparameter tuning. However, for this functionality to be leveraged, data needs to be downloaded locally or stored in Google Drive or Google Cloud Storage to benefit from the Machine learning python ecosystem. Therfore, this package aims to make it easier and faster to download GEE-processed data in a machine learning-ready format. 

**Features**
* Parallel export of images or sparse images (for example, GEDI).
* Export raster values at points or polygons (ee.FeatureCollection).
* Summarise raster data within polygons (ee.FeatureCollections).
* Extract both tabular and Deep Neural Network (DNN) type datasets.

<!-- GETTING STARTED -->
## Getting Started

## Insta

<!-- ROADMAP -->
## Roadmap

- [ ] Support the export of additional formats (TFrecords)
- [ ] Download data from GEE based on local shapefiles
- [ ] Add more examples for using the package

See the [open issues](https://github.com/Geethen/geeml/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact
Hosts GEE Developers-Nairobi geedevsnairobi@gmail.com

Facilitator: Wafula Michael - https://www.linkedin.com/in/wafula-michael-wekesa-013834221/

Project Link: https://github.com/geedevsnairobi/ML-and-Land-Use-Land-Cover-Change-Detection-

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [GDG Nairobi](https://gdg.community.dev/gdg-nairobi/)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Geethen/geeml.svg?style=for-the-badge
[contributors-url]: https://github.com/Geethen/geeml/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Geethen/geeml.svg?style=for-the-badge
[forks-url]: https://github.com/Geethen/geeml/network/members
[stars-shield]: https://img.shields.io/github/stars/Geethen/geeml.svg?style=for-the-badge
[stars-url]: https://github.com/Geethen/geeml/stargazers
[issues-shield]: https://img.shields.io/github/issues/Geethen/geeml.svg?style=for-the-badge
[issues-url]: https://github.com/Geethen/geeml/issues
[license-shield]: https://img.shields.io/github/license/Geethen/geeml.svg?style=for-the-badge
[license-url]: https://github.com/Geethen/geeml/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
