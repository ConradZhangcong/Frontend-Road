module.exports = {
  name: prompt('package name', basename || package.name),
  version: prompt('version', '0.0.0'),
  decription: prompt('description', ''),
  main: prompt('entry point', 'index.js'),
  repository: prompt('git repository', ''),
  keywords: prompt(function (s) { return s.split(/\s+/) }),
  author: prompt('author', 'Conradzc <zhangcong.job@outlook.com> (conradzc.com)'),
  license: prompt('license', 'MIT')
}