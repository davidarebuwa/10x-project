var ghpages = require('gh-pages');
console.log('Deploying to gh-pages');
ghpages.publish('./src', function(err) {
    if (err) {
        console.log('Error deploying to gh-pages');
        console.log(err);
    } else {
        console.log('Deployed to gh-pages');
    }
});