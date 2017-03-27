import {
  get,
  set,
} from 'lodash';
import {
  expect,
} from 'chai';
import {
  detectArrayOfObject,
  parsePathElement,
  normalizePath,
  getDeepPath,
  deepSet,
  deepGet,
  deepUpdate,
} from '../src';

describe('path handling', () => {
  describe('detectArrayOfObject', () => {
    it('should return true when path describes array of object a[{key=value}]', () => {
      const path = 'a[{key=value}]';
      const actual = detectArrayOfObject(path);
      expect(actual).equal(true);
    });

    it('should return true when path describes array of object [{key=value}]', () => {
      const path = '[{key=value}]';
      const actual = detectArrayOfObject(path);
      expect(actual).equal(true);
    });

    it('should return false when path doesnt describes array of object a[0]', () => {
      const path = 'a[0]';
      const actual = detectArrayOfObject(path);
      expect(actual).equal(false);
    });

    it('should return false when path doesnt describes array of object (string)', () => {
      const path = 'a';
      const actual = detectArrayOfObject(path);
      expect(actual).equal(false);
    });
  });

  describe('parsePathElement', () => {
    it('should parse path to object', () => {
      const path = 'a[{key=value}]';
      const actual = parsePathElement(path);
      const expected = {
        key: 'a',
        selector: 'key',
        value: 'value',
      };
      expect(actual).deep.equal(expected);
    });

    it('should parse path to object', () => {
      const path = '[{key=value}]';
      const actual = parsePathElement(path);
      const expected = {
        key: '',
        selector: 'key',
        value: 'value',
      };
      expect(actual).deep.equal(expected);
    });

    it('should return undefine if wrong shape', () => {
      const path = 'a[0]';
      const actual = parsePathElement(path);
      const expected = undefined;
      expect(actual).equal(expected);
    });
  });

  describe('normalizePath', () => {
    const object = {
      a: 1,
      b: {
        bkey: 'bvalue',
      },
      c: [
        {
          id: 1,
          cvalue: 'cvalue1',
        },
        {
          id: 2,
          cvalue: 'cvalue2',
        },
      ],
    };

    it('should normalizePath from string path of nested object', () => {
      const path = 'a';
      const actual = normalizePath(object, path);
      const expected = 'a';
      expect(actual).equal(expected);
    });

    it('should normalizePath from path of nested object', () => {
      const path = 'b.bkey';
      const actual = normalizePath(object, path);
      const expected = 'b.bkey';
      expect(actual).equal(expected);
    });

    it('should get value from path of nested object', () => {
      const path = 'c[1]';
      const actual = normalizePath(object, path);
      const expected = 'c[1]';
      expect(actual).equal(expected);
    });

    it('should get value from path of nested object', () => {
      const path = 'c[{id=1}]';
      const actual = normalizePath(object, path);
      const expected = 'c[0]';
      expect(actual).equal(expected);
    });

    it('should get value from path of array', () => {
      const path = '[{id=1}]';
      const actual = normalizePath(object.c, path);
      const expected = '[0]';
      expect(actual).equal(expected);
    });

    it('should return undefined from invalid path', () => {
      const actual1 = normalizePath(object, 'd[{id=1}]');
      const actual2 = normalizePath(object, 'b[1]');
      const actual3 = normalizePath(object, 'e');
      expect(actual1).equal('d[-1]');
      expect(actual2).equal('b[1]');
      expect(actual3).equal('e');
    });
  });

  describe('Integrate with lodash', () => {
    const object = {
      a: 1,
      b: {
        bkey: 'bvalue',
      },
      c: [
        {
          id: 1,
          cvalue: 'cvalue1',
        },
        {
          id: 2,
          cvalue: 'cvalue2',
        },
      ],
    };

    it('should use with get of lodash', () => {
      const path = 'c[{id=1}]';
      const actual = get(object, normalizePath(object, path));
      const expected = {
        id: 1,
        cvalue: 'cvalue1',
      };
      expect(actual).deep.equal(expected);
    });

    it('should use with set of lodash', () => {
      const path = 'c[{id=1}]';
      const normalizedPath = normalizePath(object, path);
      set(object, normalizedPath, 'newValue');
      const actualGet = get(object, normalizedPath);
      expect(actualGet).equal('newValue');
    });
  });
});


describe('README should work', () => {
  const origin = [
    {
      a1: 'a1',
      b1: {
        c1: 'c1',
      },
    },
    {
      a2: 'a2',
      b2: {
        c2: 'c2',
      },
    },
  ];

  describe('getDeepPath', () => {
    it('should work', () => {
      const path = '[{a1=a1}].b1.c1';
      const actualGetDeepPath1 = getDeepPath(path)(origin);
      const actualGetDeepPath2 = getDeepPath(path, origin);
      const expected = '[0].b1.c1';

      expect(actualGetDeepPath1).equal(expected);
      expect(actualGetDeepPath2).equal(expected);
    });
  });


  describe('getDeepPath with selector', () => {
    it('should work', () => {
      const path = '[{b2.c2=c2}].a2';
      const actualGetDeepPath1 = getDeepPath(path)(origin);
      const actualGetDeepPath2 = getDeepPath(path, origin);
      const expected = '[1].a2';

      expect(actualGetDeepPath1).equal(expected);
      expect(actualGetDeepPath2).equal(expected);
    });
  });

  describe('deepGet', () => {
    it('should work', () => {
      const path = '[{a1=a1}].b1';
      const actualDeepGet1 = deepGet(path)(origin);
      const actualDeepGet2 = deepGet(path, origin);
      const expected = {
        c1: 'c1',
      };

      expect(actualDeepGet1).deep.equal(expected);
      expect(actualDeepGet2).deep.equal(expected);
    });
  });

  describe('deepSet', () => {
    it('should work', () => {
      const path = '[{a1=a1}].b1';
      const data = {
        d1: 'd1',
      };

      const newOrigin1 = deepSet(path)(data)(origin);
      const newOrigin2 = deepSet(path, data)(origin);
      const newOrigin3 = deepSet(path, data, origin);

      expect(newOrigin1 === newOrigin2).equal(false);
      expect(newOrigin2 === newOrigin3).equal(false);
      expect(origin === newOrigin3).equal(false);
      expect(newOrigin1 === newOrigin3).equal(false);

      const expectedData = [
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

      expect(origin).not.deep.equal(expectedData);
      expect(newOrigin1).deep.equal(expectedData);
      expect(newOrigin2).deep.equal(expectedData);
      expect(newOrigin3).deep.equal(expectedData);
    });
  });


  describe('deepUpdate', () => {
    it('should work', () => {
      const path = '[{a1=a1}].b1';
      // oldData = { c1: c1 }
      const updateFunction = (oldData) => ({
        ...oldData,
        d1: 'd1',
      });

      const newOrigin1 = deepUpdate(path)(updateFunction)(origin);
      const newOrigin2 = deepUpdate(path, updateFunction)(origin);
      const newOrigin3 = deepUpdate(path, updateFunction, origin);

      expect(newOrigin1 === newOrigin2).equal(false);
      expect(newOrigin2 === newOrigin3).equal(false);
      expect(origin === newOrigin3).equal(false);
      expect(newOrigin1 === newOrigin3).equal(false);

      const expectedData = [
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

      expect(origin).not.deep.equal(expectedData);
      expect(newOrigin1).deep.equal(expectedData);
      expect(newOrigin2).deep.equal(expectedData);
      expect(newOrigin3).deep.equal(expectedData);
    });
  });
});
