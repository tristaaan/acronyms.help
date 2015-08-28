#Acronyms.help
Instantly lookup acronyms.

##Setup
```
npm install
npm start
```

## Branches
There is also a `area-codes` branch which quickly looks up area codes in the US and nearby regions. It also etirely removes the backend and instead uses `webpack` to pack the json with the Angular source. If you run that branch you'll need to do `npm run build` before anything.

##Contributing
Pull requests with new acronyms will be gladly merged. When adding them, make sure to maintain proper JSON format and alphabetical ordering by category. While categories are not used on the front-end right now, a category filter might be desirable to have later on.