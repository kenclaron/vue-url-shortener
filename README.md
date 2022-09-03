# URL Shortener Service
> Project developed for `hex.team` company

> Case: Create the front end of the link shortening service. The main functionality of the service is getting by an arbitrary link (URL => http://.../s/7ASMU), which redirects the user to the original page. In addition, the user who created the shortened link can view the number of clicks on that link. This information will not be available to other users. As a result, the user should be able to register on the site, log in, create an arbitrary number of shortened links and see the number of clicks on each of them.

> Stack: `Vue 3`, `TypeScript`, `SCSS`, `Node.js`

## Usage

### **Through npm (Dev. ver.)**
* Install Node.js - https://nodejs.org/en/
* Open console (`Win + R` with `cmd`) and type this command for clone git repository: `git clone https://github.com/kenclaron/vue-url-shortener.git`
* Type: `cd ./vue-url-shortener`
* Type: `npm install -g @vue/cli@5.0.8` install Vue CLI globally for correct work
* Type: `npm install` and wait when all libraries been downloaded
* Type: `npm run lint` for check lint errors
* Type: `npm run build` for build app in `./dist` for production
* Type: `npm run serve` and open `localhost:8080` or `localhost:8081` (see address in console)

```text
  git clone https://github.com/kenclaron/vue-url-shortener.git
  cd ./vue-url-shortener
  npm install -g @vue/cli@5.0.8
  npm install
  npm run lint
  npm run build
  npm run serve
```

### **Through Docker**
* Install Node.js - https://nodejs.org/en/
* Install Docker - https://www.docker.com/products/docker-desktop/
* Clone repo
* Start repo
* (?) Maybe required Vue CLI: `npm install -g` 

## Project folder
```text
vue-url-shortener/
├─── dist         - builded version
├─── node_modules - npm libraries
├─── src          - source files (.vue, .scss, .ts, images)
├───── assets
├─────── fonts
├─────── router   - vue-router for links
├─────── scss
├─────── svg
├─────── ts
├───── components - pages (.vue)
├─ ...
└─ {other_config_files}
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
# Project Preview - Web Wallpaper Engine

## About
Wallpaper Engine but online-version. View animated wallpapers directly in your browser. 

**Case**: Create web-analog of Wallpaper Engine with support Desktop and Mobile platforms using HTML/CSS/JS/PHP.

**Solution with**: HTML5, CSS3, JavaScript (ES6), PHP7+

**Check this project here**: [http://projectpreview.ultimatefreehost.in](http://projectpreview.ultimatefreehost.in/w/1) (USE HTTP ONLY!)

## Preview
[<img src="https://i.imgur.com/oyGIZEE.png" width="47.5%"/>](https://i.imgur.com/oyGIZEE.png) [<img src="https://i.imgur.com/LNfkUP5.jpg" width="42.75%"/>](https://i.imgur.com/LNfkUP5.jpg) 
[<img src="https://i.imgur.com/rcUDfW6.jpg" width="30%"/>](https://i.imgur.com/rcUDfW6.jpg) [<img src="https://i.imgur.com/XqFJbBc.jpg" width="30%"/>](https://i.imgur.com/XqFJbBc.jpg) [<img src="https://i.imgur.com/Ut10l3H.jpg" width="30%"/>](https://i.imgur.com/Ut10l3H.jpg)

**Video** - https://www.youtube.com/watch?v=9gkEwY_h9lA

**Gif** -  https://i.imgur.com/f9TEyd7.gif


## Table of Contents
- [Preview](#preview)
- [Features](#features)
- [Project folder description](#project-folder-description)
- [Usage](#usage)
- [Requirements](#requirements)
  - [Browsers](#browsers)
  - [Software](#software)
- [Dependencies](#dependencies)
- [Inspired by](#inspired-by)
- [License](#license)
- [Author](#author)

## Features

- Supports **HTML, JS, CSS** code in projects;
- Full customizing of projects;
- Supports all custom dynamic settings of projects;
- Taking a screenshot of animation;
- Supports **OpenGraph** on third-party services
- Supports all original events and input types from Wallpaper Engine;
- Supports downloading of source in `.zip`;
- Real-time editor of your Javascript Canvas-animation;
- Debug menu;
- **Cross-browser** support;
- **Desktop and Mobile (Android and IOS) platforms** support.

## Project folder description

```
```

## Usage

* Open website - [projectpreview.ufh.in](http://projectpreview.ultimatefreehost.in/w/1);
* Import all files on your local or public server with PHP-support:
  * Launch PHP-server;
  * Open `{{url}}/` or `{{url}}/index.php` in your browser for start page;
  * Open `{{url}}/w/1` in your browser for open project with `id=1`;
  * Open `{{url}}/download.php?id=1` in your browser for download project in-zip with `id=1`.

## Requirements 

### Browsers
* **Chrome** (49.0.2623 or latest)
* **Firefox** (45.0 or latest)
* **Opera** (36.0.2130.32 or latest)
* **Edge** (25.10586/EdgeHTML 13.10586 or latest)
* **Safari** (9.0 or latest)

### Software
* Any software using Blink 49 or latest (ex. Chromium, electron.js)
* Any software using V8 4.9.385 or latest

## Dependencies 
* **jQuery** - v3.6.0
* **HammerJS** - v2.0.6
* **Touch-Menu-Like-Android** - v0.8

## Inspired by
**Wallpaper Engine** - https://www.wallpaperengine.io/

## License
The **Project Preview** licensed under the [MIT license](https://opensource.org/licenses/MIT).

> Original files of projects in the folders from `/project/1` to `/project/13` are licensed under CC BY-NC-ND 4.0 (https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode) by Dmitry Britov

## Author
> You can express your gratitude by clicking on one of the links

* [Personal website](https://kenclaron.github.io/kenclaron)
* [VK](https://vk.com/club190729942)