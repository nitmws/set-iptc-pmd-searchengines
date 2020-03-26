# set-iptc-pmd-searchengines

This is an app for embedding [IPTC Photo Metadata](https://iptc.org/standards/photo-metadata/iptc-standard/) required by search engines for displaying relevant rights metadata.

## Overview

The overall workflow:
* IPTC metadata are typed into a form
* After submitting the form corresponding metadata are created in different formats
* Data in special JSON format - complying with [ExifTool](https://exiftool.org) can be downloaded
* The downloaded metadata can be embedded into one to many image files with a local instance of ExifTool

## The web app

The web app is a simple Node.js and Javascript-based application. It provides these web pages: 
* Introducing the user to the app
* A form for collecting metadata
* A page to show the created metadata and to let a user download the JSON metadata
* A page about how to use this app
* An About page

The files of this web app reside in the root directory of this repository and its sub-directories except the _tool-package sub-directory.

## The local tool-package

As outlined in the Overview the web-based part of this app needs also a local part.

A user is invited to download a ZIP package and to uncompress it in a preferred local directory. This ZIP package includes scripts for Windows, Macos and Linux for embedding the generated IPTC metadata using a locally installed instance of the program ExifTool. (An instance for Windows in included.) Further it provides a directory with a few imaged without any metadata, they can be used for testing the embedding of metadata.

All the files of this tool-package reside in the /_tool-package directory of this repository.
 
----

Developed by @nitmws

License: [MIT](LICENSE)