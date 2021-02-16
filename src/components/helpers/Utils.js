import React from 'react';
import { toast } from 'react-toastify';
import { getOpErrorText } from '../common/FormsMobx/Utils';
import { Localize } from '../common/Locale/Loc';
import { Link } from 'react-router-dom';

function getChromeVersion() {
  var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
  return raw ? parseInt(raw[2], 10) : false;
}

export var IS_CHROME = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
export var IS_SAFARI = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
export var CHROME_VERSION = getChromeVersion();
export var BROWSER_APPLIES_TZOFFSET = IS_SAFARI || (CHROME_VERSION > 1 && CHROME_VERSION <= 57);

export const startsWith = (str, stringBuscada, posicion) => {
  posicion = posicion || 0;
  return str.indexOf(stringBuscada, posicion) === posicion;
};

export const isString = target => {
  return typeof target === 'string' || target instanceof String;
};

export const objToArray = obj => {
  const result = [];
  for (let p in obj) result.push(obj[p]);

  return result;
};

export const getOptionsFromKeyedObject = (data, valueField = 'fullName', idField = 'id') => {
  const result = objToArray(data);
  return result.map(m => ({ label: m[valueField], value: m[idField] }));
};

export const getRandomId = () =>
  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const defIcons = {
  team: 10,
  tournament: 3,
  user: 8,
  org: 1,
};

export const getUploadsIcon = (imgSrc, idObject, type = 'team') => {
  if (imgSrc && imgSrc !== 'undefined') return getUploadUrl(imgSrc);

  if (typeof idObject === 'undefined') idObject = 0;
  const i = (idObject % defIcons[type]) + 1;
  return '/static/' + type + '/default' + i + '.png';
};

export const getPlayerIdPicture = (imgSrc, className = null, alt = '') => {
  const src = imgSrc ? getUploadUrl(imgSrc) : getStaticRoot() + '/player/noIdPhoto.png';
  return <img src={src} alt={alt} className={className} />;
};

export const getPlayerIdPictureWithLink = (imgSrc, className = null, alt = '') => {
  const src = imgSrc ? getUploadUrl(imgSrc) : getStaticRoot() + '/player/noIdPhoto.png';
  const imgResult = <img src={src} alt={alt} className={className} />;

  if (!imgSrc) return imgResult;

  return (
    <a href={src} target="_blank">
      {imgResult}
    </a>
  );
};

export const getUploadsImg = (imgSrc, idObject, type, className = null, alt = '') => {
  return <img src={getUploadsIcon(imgSrc, idObject, type)} alt={alt} className={className} />;
};

export const getUploadUrl = repoPath => {
  if (!repoPath) return '';
  if (startsWith(repoPath, 'http')) return repoPath;
  return getUploadRoot() + '/' + repoPath;
};

export const getTeamLink = (idTournament, idTeam, content) => {
  return <Link to={'/tournaments/' + idTournament + '/teams/' + idTeam}>{content}</Link>;
};

export const getTeamLogo = (idTournament, idTeam, teamLogoUrl) => {
  return getTeamLink(idTournament, idTeam, getUploadsImg(teamLogoUrl, idTeam, 'team', 'TeamLogo'));
};

export const getMatchLink = (idTournament, idMatch, content) => {
  return <Link to={'/tournaments/' + idTournament + '/matches/' + idMatch}>{content}</Link>;
};

export const getUploadRoot = () => {
  return getBaseUrl(process.env.REACT_APP_STATIC_UPLOADS_URL);
};

export const getStaticRoot = () => {
  return getBaseUrl(process.env.REACT_APP_STATIC_STATIC_URL);
};

export const getBaseUrl = url => {
  return url.replace('{{BaseHost}}', window.location.hostname);
};

export const getAge = dateString => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const getPlayerLink = (idTournament, idTeam, player) => {
  const content = player ? player.name + ' ' + player.surname : '--';
  return (
    <Link to={'/tournaments/' + idTournament + '/teams/' + idTeam + '/players/' + player.id}>{content}</Link>
  );
};

export const requestAsync = function (state, operation, okMessage, ...operationArgs) {
  return new Promise((resolve, reject) => {
    if (state) state.loading = true;

    operation(...operationArgs).then(
      res => {
        if (state) state.loading = false;
        if (okMessage) toast.success(Localize(okMessage));
        resolve(res.data);
      },
      err => {
        const errorMsg = getOpErrorText(err);
        if (state) {
          state.loading = false;
          state.error = errorMsg;
        }
        toast.error(errorMsg);
        reject(errorMsg);
      }
    );
  });
};

export const getISOStringWithoutSecsAndMillisecs = date => {
  const dStr = date.toISOString();
  return dStr.substring(0, dStr.indexOf(':', dStr.indexOf(':') + 1));
};

export const interpolateString = (str, ...args) => {
  let result = str;

  for (let i = 0; i < args.length; ++i) result = result.replace('{' + i + '}', args[i]);

  return result;
};

export const interpolateStringMultiple = (str, ...args) => {
  let result = str;
  for (let i = 0; i < args.length; ++i) result = result.replaceAll('{' + i + '}', args[i]);

  return result;
};

export const getFormattedCurrency = (value, currency = 'eur') => {
  const pv = parseFloat(value);
  if (!isNaN(pv)) value = pv;

  if (!value) value = 0.0;

  switch (currency) {
    case 'eur':
      return value.toFixed(2) + '€';
    case 'usd':
      return '$' + value.toFixed(2);
    default:
      return value;
  }
};

export const parseJson = json => {
  try {
    return JSON.parse(json);
  } catch (ex) {
    return null;
  }
};

export const getJsonError = json => {
  try {
    JSON.parse(json);
  } catch (e) {
    return e.message;
  }
  return null;
};

export const getUniqueInt = () => {
  return new Date().getTime();
};

export const getInt = value => {
  if (isString(value)) return parseInt(value, 10);

  return value;
};

export const matchHasSootOut = match => {
  if (match.visibleHomeScore !== 0 || match.visibleVisitorScore !== 0) return true;
  return false;
};
