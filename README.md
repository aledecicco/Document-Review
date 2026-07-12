## Document Review

This is a responsive web application that implements the "review page" requirement.

Hosted [here](https://aledecicco.github.io/Document-Review/).

### Usage

To install dependencies:
```
pnpm install
```

To run the app, on port 5173:
```
pnpm dev
```

### Before launch

Before this app is production-ready, there are many things to consider:
- Replacing the mocked API response with a call to the actual backend.
- Removing the mock data from the codebase.
- Using a licensed version of the PDF viewer library, to remove watermarks and enable all features.
- Plugging-in the rest of the pages that will be implemented by others on the team.
- Adding authentication handling for viewing, uploading, and submitting files.
- End to end testing of all the features in this ticket.

### Design

[Link to Figma file](https://www.figma.com/site/F8sebMMTrNpRDxGi4hKhex/Document-Review-Mock)

### Considerations

This was a pretty simple project, but I still had to consider a few things. 

One feature I was sure I wanted to include was displaying the PDF inside the site, and tracking the page the user is looking at at any given moment, so I had to look for a library that enabled that.

To get as close as possible to the behavior the site will have when live, I'm defining the queries now, only with their fetch functions mocked. That way, it's easy to switch them for real calls to the API, and the site still works the same way. All loading and error states are already handled.

I tried to keep the components clean, with classes and styles that can be easily understood, even with responsive variations. For that reason I used tailwind, and some utilities for conditional classes.

To get going quickly, I opted to use a component library, from which I took the components defined in the `base` folder.
