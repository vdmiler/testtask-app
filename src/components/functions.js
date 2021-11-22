import axios from "axios";

export const excerptedText = (string, long = 22) => {
   let excerpt = '';
   if (string.length > long) {
      excerpt = string.slice(0, long)
   } else {
      return string;
   }
   return excerpt + '...'
}

export const getUnique = (arr, index) => {
   const unique = arr
      .map(e => e[index])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => arr[e]).map(e => arr[e]);
   return unique;
}

export const getFileNameFromLink = (link) => {
   const linkToArray = link.split('/');
   const fullFileName = linkToArray[linkToArray.length - 1];
   const fileNameToArray = fullFileName.split('.');
   const fileName = fileNameToArray[0];
   return fileName;
}

export function setStorageWithExpiry(key, value, ttl) {
   const now = new Date()
   const item = {
      value: value,
      expiry: now.getTime() + ttl,
   }
   localStorage.setItem(key, JSON.stringify(item))
}

export function getStorageWithExpiry(key) {
   const itemStr = localStorage.getItem(key)
   if (!itemStr) {
      return null
   }
   const item = JSON.parse(itemStr)
   const now = new Date()
   if (now.getTime() > item.expiry) {
      localStorage.removeItem(key)
      return null
   }
   return item.value
}
