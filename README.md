# set-iptc-pmd-searchengines

This is an app for embedding [IPTC Photo Metadata](https://iptc.org/standards/photo-metadata/iptc-standard/) required by search engines for displaying relevant rights metadata.

## Overview

The overall workflow:
* IPTC metadata are typed into a form
* After submitting the form corresponding metadata are created in different formats
* Data in the specific JSON format of [ExifTool](https://exiftool.org) can be downloaded
* The downloaded metadata can be embedded into one to many image files with a local instance of ExifTool

## The web app

This web app is a simple Node.js and Javascript-based application. It provides these web pages: 
* Introducing the user to the app
* A form for collecting metadata
* A page to show the IPTC and Exif metadata created from the form and to let a user download the metadata as ExifTool JSON file
* A page about how to use this app with tools on a local computer, with variants for the supported local operating systems Windows, macOS and Linux
* An About page

## The Tool Package for a local computer

As outlined in the Overview the web-based part of this app needs also a local part.

A user is invited to download a ZIP package and to uncompress it in a preferred local directory. This ZIP package includes scripts for Windows, macOS and Linux for embedding the generated IPTC metadata using a locally installed instance of the program ExifTool. (An executable for Windows is included.) As second option an executable for Windows and macOS is available, dropping image files on it embeds the metadata too Further it provides a directory with a few imaged without any metadata, they can be used for testing the embedding of metadata.

All three Tool Package zip files are available in the /public directory.
  
## Change Log

* v 0.2.2 Major edits of the How To page, content of Tool Package extended
* v 0.2.1 Minor edits of the How To page
* v 0.2.0 First version with full functionality

----

Developed by [nitmws](https://github.com/nitmws) with contributions from [David Riecks](http://riecks.com/) and [Henry Sautter](https://sautter.photography/).

License: [MIT](LICENSE)