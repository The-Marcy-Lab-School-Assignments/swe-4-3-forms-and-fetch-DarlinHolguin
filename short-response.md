# Short Response Questions

## Question 1: Promise Chaining

The following code logs `undefined` in the second `.then()`. Identify the bug and fix it.

```js
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
  .then((response) => {
    if (!response.ok) throw Error(`Fetch failed.`);
    const readingPromise = response.json();
  })
  .then((data) => {
    console.log(data); // undefined!
  })
  .catch((error) => console.error(error.message));
```

**Your Answer:**

```js
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
  .then((response) => {
    if (!response.ok) throw Error(`Fetch failed.`);
    const readingPromise = response.json();
    return readingPromise; // Nothing was returned! This is why the second.then is getting undefined.
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.error(error.message));
```

## Question 2: Development Servers and CORS

A student opens their `index.html` file directly in the browser (using the `file://` protocol). Their `<script type="module">` tag and `fetch()` call both fail. Explain why, and what they should do instead.

**Your Answer:**
When the student opens their `index.html` file directly in the browser, their `<script type="module">` tag and `fetch()` call both fail. The reason for this is because **Javascript modules** have to be loaded over HTTP/HTTPS instead of `file://`.

What the student should do instead is run a local development server. To do this, the student will type in their **console** "npm run dev". This will allow the student to start a local development server that utilizes HTTP and the link to the page would look something like "http://localhost:5173". Running a development server will allow `fetch()` and the `<script type="module">` to work.

## Question 3: The `fetch` Response Object

When we use `fetch()`, why do we check `response.ok` before reading the response body? What kinds of errors does this catch that `.catch()` alone would miss if we skipped this step as shown in the code below:

```js
const response = await fetch(url);
const data = await response.json();
```

**Your Answer:**
When we send a `fetch()` request, it's possible that this request of data or information fails. If it did fail, there won't be any data being sent back in order for us to use and read. The `response.ok` property will be true if the request succeeded and if otherwise then false. If we skipped it and went straight to `response.json()` you'd be trying to read a failed response, something like a URL with a miss input or a network issue.

## Question 4: Async/Await Conversion

Rewrite the following `.then()`-based code using `async`/`await` with `try`/`catch`:

```js
const getJoke = () => {
  return fetch("https://v2.jokeapi.dev/joke/Programming?type=twopart")
    .then((response) => {
      if (!response.ok) throw Error(`Fetch failed. ${response.status}`);
      return response.json();
    })
    .then((data) => {
      return { data, error: null };
    })
    .catch((error) => {
      return { data: null, error };
    });
};
```

**Your Answer:**

```js
const getJoke = async () => {
  try {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?type=twopart",
    );

    if (!response.ok) {
      throw Error(`Fetch failed ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return { data: data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
```

## Question 5: `event.preventDefault()` and Form Handling

A student writes a form handler but the data never displays. Their code:

```js
form.addEventListener("submit", (event) => {
  const name = form.elements.name.value;
  document.querySelector("#output").textContent = name;
});
```

What is wrong? What happens when they click submit, and how do they fix it?

**Your Answer:**
The bug identified in the code above is that `event.preventDefault()` is never called. When the user clicks submit, the browser performs its default form submission behavior, which causes the page to reload. The DOM update (`textContent = name`) runs briefly, but the reload wipes all of it out completely, so the user is actually never even able to see this data.

In order to fix it, you would need to add `event.preventDefault()` as the first line below the event handler, doing this would prevent the default reload behavior so that the DOM can be updated and run by **Javascript**.

## Question 6: Putting It All Together

The steps below describe how to build a form that fetches Pokemon data from `https://pokeapi.co/api/v2/pokemon/{name}` based on the name entered in the form and displays the pokemon's data on the page. The steps are listed in a **random order**. Rearrange them into the correct sequence.

- A. Parse the response body with `await response.json()`
- B. Call `event.preventDefault()` to stop the page from reloading
- C. Check `response.ok` and throw an error if the response failed
- D. Update the DOM with the Pokemon's data
- E. Add a `'submit'` event listener to the form
- F. Handle errors in the `catch` block (display an error message)
- G. Extract the Pokemon name from the form input
- H. Send a GET request with `fetch()` using the Pokemon name in the URL
- I. Reset the form with `form.reset()`
- J. Create the HTML form with a name input and output elements for displaying results

**Your Answer:**
