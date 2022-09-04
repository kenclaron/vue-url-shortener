# URL Shortener Service
> Project developed for `hex.team` company

> Case: Create the front end of the link shortening service. The main functionality of the service is getting by an arbitrary link (URL => http://.../s/7ASMU), which redirects the user to the original page. In addition, the user who created the shortened link can view the number of clicks on that link. This information will not be available to other users. As a result, the user should be able to register on the site, log in, create an arbitrary number of shortened links and see the number of clicks on each of them.

> Stack: `Vue 3`, `TypeScript`, `SCSS`, `Node.js`. Additional requirements: `Docker`

## Usage

### **Through npm**
* Install Node.js - https://nodejs.org/en/
* Open console (`Win + R` with `cmd`) and type this command for clone git repository: `git clone https://github.com/kenclaron/vue-url-shortener.git`
* Type: `cd ./vue-url-shortener`
* Type: `npm install -g @vue/cli@5.0.8` to install Vue CLI globally for correct work
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
* Type: `npm install -g @vue/cli@5.0.8` to install Vue CLI globally for correct work
* Type: `docker pull ghcr.io/kenclaron/vue-url-shortener:main` to clone package in Docker
* Type: `docker run -p 8080:80 -it --name vue-url-shortener ghcr.io/kenclaron/vue-url-shortener:main` to launch project
* Open `localhost:8080` or `127.0.0.1:8080`
  * (For force-refresh first launch white screen via Docker - use `localhost:8080/?` or use `127.0.0.1:8080/?`)

```text
  npm install -g @vue/cli@5.0.8
  docker pull ghcr.io/kenclaron/vue-url-shortener:main
  docker run -p 8080:80 -it --name vue-url-shortener ghcr.io/kenclaron/vue-url-shortener:main
```

### **Open Webpage**
* Open: https://vue-url-shortener-lleq2x883-kenclaron.vercel.app/
* **(!!!) WARNING: API (`http://79.143.31.216/`) DOESN'T supports HTTPS, if you are developer of this API start using HTTPS (!!!) and THIS page may don't working correctly!** 

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

## Preview
[<img src="https://i.imgur.com/WgrAacM.png" width="48%"/>](https://i.imgur.com/WgrAacM.png) 
[<img src="https://i.imgur.com/bgqZPG6.png" width="48%"/>](https://i.imgur.com/bgqZPG6.png) 
[<img src="https://i.imgur.com/qwdjhVI.png" width="48%"/>](https://i.imgur.com/qwdjhVI.png) 
[<img src="https://i.imgur.com/j8HQtHJ.png" width="48%"/>](https://i.imgur.com/j8HQtHJ.png) 
[<img src="https://i.imgur.com/WFmnT4V.png" width="48%"/>](https://i.imgur.com/WFmnT4V.png)
[<img src="https://i.imgur.com/EMdmsYe.png" width="48%"/>](https://i.imgur.com/EMdmsYe.png)

## License
The **URL Shortener Service** licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Author
> You can express your gratitude by clicking on one of the links

* [Personal website](https://kenclaron.github.io/kenclaron)
* [VK](https://vk.com/club190729942)
