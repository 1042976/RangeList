# RangeList

### Overview

- Store a list of half-closed ranges(only including left bound) of integers by ascending order without overlaps 
- Allow adding and remove ranges
- Allow printing all the existing ranges by ascending order

### Methods

- **constructor()**: Initialize an empty list
  - Usage: `const rangeList = new RangeList();`

- **add(range)**: Add range into the list. Ignore those parts that already exist
  - Usage: `rangeList.add([left, right]);	//left <= right`
- **remove(range)**: Remove range out of the list. Ignore those part that do not exist
  - Usage: `rangeList.remove([left, right]);	//left <= right`
- **print()**: Print all the existing ranges by ascending order
  - Usage: `rangeList.print();	//example: [1, 5) [8, 16) [17, 18)`

### Testing

Use Jest to do unit testing and reach 100% branch coverage

1. Install Jest

```bash
brew npm
npm install --save-dev jest
```

2. Configure Jest

```json
{
  "name": "RangeList",
  "version": "1.0.0",
  "scripts": {
    "test": "jest --coverage"
  },
  "devDependencies": {
    "jest": "^28.1.3"
  }
}
```

3. Run test

```bash
npm run test
```

The testing result would be shown in the terminal. Check more details in coverage/lcov-repost/index.html