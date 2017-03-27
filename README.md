# hoothoot

hoothoot hoothoot hoothoot.

you don't need to worry when you work with nested data.

## Getting started

```
npm install hoothoot --save

```

```
yarn add hoothoot

```

Remember to install lodash also :D

## How to use

### Concept

It will take a path which has shape like:

> a.b

> a[0].b

> a[{selector=value}].b

> [0].b

> [{selector=value}].b

And normalize it to a string that lodash get set can understand

### Object path

Syntax : `.key`

> a.b.c.d

### Array path

Syntax : `[{selector=value}]` or `[index]`

> [0].[1].b

> [{a.b=value}]


### Example

```javascript

import {
  normalizePath,
  deepGet,
  deepSet,
  deepUpdate,
} from 'hoothoot';

const origin = [
  {
    a1: 'a1Value',
    b1: {
      c1: 'c1Value',
    },
  },
  {
    a2: 'a2Value',
    b2: {
      c2: 'c2Value',
    },
  },
];

// getDeepPath
const path = '[{a1=a1Value}].b1.c1';
const actualGetDeepPath1 = getDeepPath(path)(origin);
const actualGetDeepPath2 = getDeepPath(path, origin);
const expected = '[0].b1.c1';

// getDeepPath
const path = '[{b1->c1=c1Value}].b1.c1';
const actualGetDeepPath1 = getDeepPath(path)(origin);
const actualGetDeepPath2 = getDeepPath(path, origin);
const expected = '[0].b1.c1';

// deepGet
const path = '[{a1=a1Value}].b1';
const actualDeepGet1 = deepGet(path)(origin);
const actualDeepGet2 = deepGet(path, origin);
const expected = {
  c1: 'c1',
};

// deepSet
const path = '[{a1=a1Value}].b1';
const data = {
  d1: 'd1',
};
const newOrigin1 = deepSet(path)(data)(origin);
const newOrigin2 = deepSet(path, data)(origin);
const newOrigin3 = deepSet(path, data, origin);
const expected = [
  {
    a1: 'a1',
    b1: {
      d1: 'd1',
    },
  },
  {
    a2: 'a2',
    b2: {
      c2: 'c2',
    },
  },
];

// deepUpdate
const path = '[{a1=a1Value}].b1';
const updateFunction = (oldData) => {
  // oldData = { c1: c1 }
  return {
    ...oldData,
    d1: 'd1',
  };
};

const newOrigin1 = deepUpdate(path)(updateFunction)(origin);
const newOrigin2 = deepUpdate(path, updateFunction)(origin);
const newOrigin3 = deepUpdate(path, updateFunction, origin);
const expected = [
  {
    a1: 'a1',
    b1: {
      c1: 'c1',
      d1: 'd1',
    },
  },
  {
    a2: 'a2',
    b2: {
      c2: 'c2',
    },
  },
];


```
