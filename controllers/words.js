
const fs = require('fs');
const BYTES_PER_MB = 1024 ** 2;
const MAX_IN_MB = 1024;
const PATH_DEFAULT = './data/file.txt';
const WORDS_DEFAULT = 3;

const getWords = (req, res, nWord = WORDS_DEFAULT, path = PATH_DEFAULT) => {
  if (process.argv.length < 3) {
    console.log('Enter number of words');
    process.exit(1);
  }
  const stats = fs.statSync(path);
  const fileSizeInBytes = stats.size;
  const fileSizeInMb = fileSizeInBytes / (BYTES_PER_MB);
  if(fileSizeInMb > MAX_IN_MB) {
    console.log('The file exceeds the allowed size');
    process.exit(1);
  }
  try {
    console.log('Processing...');
    fs.readFile(path, 'utf-8', (err, data)=> {
      const result = frequencies(nWord, data);
      console.log('frequencies:', result);
      res.writeHead(200, {'Content-Type': 'application/json'});
      return res.end(JSON.stringify({
        frequencies: result
      }));
    });
  } catch (error) {
    console.log('Error', error);
  }
}

function cleanFrequencies(word) {
  return word.toLowerCase().replace(/[.,;]/g, "")
}

function frequencies (nWord, words) {
  let text = {};
  let splitText = words.split(' ');
  for(let word of splitText){
    if(cleanFrequencies(word) in text){
      text[cleanFrequencies(word)]++;
    } else {
      text[cleanFrequencies(word)] = 1;
    }
  }
  let sortable = [];
  for (let item in text) {
      sortable.push({
        word: item,
        count: text[item]
      })
  }
  sortable.sort(function(a,b) {
    return b.count - a.count;
  });
  const result = sortable.slice(0, nWord);
  return result;
}


module.exports = {
  getWords
}

