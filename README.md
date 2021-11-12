# Reading Blogs Assignment Supermetrics

Hi, This is Anh. I made this small app as Supermetrics assignment in hope of becoming Junior Front-end React Developer.

Thank you for coming and enjoy using the app. :)

## Tech Stacks.

- HTML, CSS.
- React, Redux, Redux-Persist.

## Plan for Improvements.

- Better form validation.
- Private route for single blog post.
- React lazy and Suspense for better performance.
- TypeScript version and using React Testing Library (Jest).

## What I learnt from the assignment.

- Implement debounce function on onChange input event -> to increase perfomance when clients search.
- A better planning for the app. I did not quite understand the "Deep linkable post" feature, so I decided to tackle it at last. It turnt out a bad decision due to bad planning. :D I had to change the whole app structure to get "Deep linkable post" feature working.
- What does it mean "deep linking" list item? Simply user can access list item by entering the direct URL and it will point to the list item itself. Long story short, one URL for one list item.

## Screenshot

[![Screenshot-2021-11-11-at-18-16-19-IAMANH-READING-POSTS.png](https://i.postimg.cc/V6f97J6x/Screenshot-2021-11-11-at-18-16-19-IAMANH-READING-POSTS.png)](https://postimg.cc/4K0hyNpP)

## Deploy

This small app is deployed on GitHub. Please check it out [here](https://iamanh1990.github.io/supermetrics_assignment/).

## Cloning the App.

If you would like to get the app running on your computer, please follow these steps:

```
 git clone
 cd supermetrics_assignment
 npm install
```

Then you will need these following environment variables. Create a .env file in your root folder, fill these in:

```
REACT_APP_API_URL=https://api.supermetrics.com/assignment
REACT_APP_API_CLIENT_ID=ju16a6m81mhid5ue1z3v2g0uh
```

Now it's ready to run:

```
npm start
```

Thank you and have fun :). <br> Anh
