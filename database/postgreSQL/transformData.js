// NOTE: THIS FILE IS NOT NEEDED. There is a minimal use case for needing to clean the data extensively since the csv file format follows the format requested from the client very closely.

// const csv = require('csv-parser');
// const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
// const fs = require('fs');
// const { Transform } = require('stream');

// // parse data as it come through stream
// const questCsvStringifier = createCsvStringifier({
//   header: [
//     { id: 'id', title: 'id' },
//     { id: 'product_id', title: 'product_id' },
//     { id: 'body', title: 'body' },
//     { id: 'date_written', title: 'date_written' },
//     { id: 'asker_name', title: 'asker_name' },
//     { id: 'asker_email', title: 'asker_email' },
//     { id: 'reported', title: 'reported' },
//     { id: 'helpful', title: 'helpful' },
//   ],
// });

// const ansCsvStringifier = createCsvStringifier({
//   header: [
//     { id: 'id', title: 'id' },
//     { id: 'question_id', title: 'question_id' },
//     { id: 'body', title: 'body' },
//     { id: 'date_written', title: 'date_written' },
//     { id: 'answerer_name', title: 'answerer_name' },
//     { id: 'answerer_email', title: 'answerer_email' },
//     { id: 'reported', title: 'reported' },
//     { id: 'helpful', title: 'helpful' },
//   ],
// });

// const cleanData = () => {
//   const readQStream = fs.createReadStream('/csv_files/questions.csv');

//   const writeQStream = fs.createWriteStream('/csv_files/cleanFiles/cleanQuestions.csv');

//   return new Promise((resolve) => {
//     const transformer = new Transform({
//       writableObjectMode: true,
//       transform(chunk, encoding, next) {
//         const dateObj = new Date(chunk.date_written);
//         const dateFormat = dateObj.toISOString();
//         chunk.date_written = dateFormat;
//         chunk = questCsvStringifier.stringifyRecords([chunk]);
//         this.push(chunk);
//         next();
//       },
//     });
//     writeQStream.write(questCsvStringifier.getHeaderString());
//     readQStream
//       .pipe(csv())
//       .pipe(transformer)
//       .pipe(writeQStream)
//       .on('finish', () => {
//         console.log('Question stream complete');
//         const readAStream = fs.createReadStream('/csv_files/answers.csv');
//         const writeAStream = fs.createWriteStream('/csv_files/cleanFiles/cleanAnswers.csv');
//         writeAStream.write(ansCsvStringifier.getHeaderString());
//         readAStream.pipe(csv()).pipe(transformer).pipe(writeAStream).end();
//         console.log('Answer stream complete');
//         resolve();
//       });
//   });
// };
