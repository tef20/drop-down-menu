export default function idGen(lastID) {
  let id = lastID ?? -1;

  function current() {
    return id;
  }

  function next() {
    return ++id;
  }

  return { current, next };
}

// export { idGen };
