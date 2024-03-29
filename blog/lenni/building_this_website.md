# Building this Website

## How it Started

For a long time, all of Eisvana's apps were stored in my own GitHub account. I eventually moved them to a dedicated GitHub organisation, so Eisvana's projects are isolated and don't drown in 20 other unrelated repositories.

With that change, we also got the opportunity of creating our own index page. Just like the repositories in my account, Eisvana's websites were drowning in the growing list of other projects on my personal index page.

So now Eisvana has its own GitHub org, and its own index page. Very clean, very easy to navigate. But just an index page is boring. At the end of January 2024, I had the idea that it should be a central hub for all digital processes in Eisvana.

## The Framework

I don't know how I exactly ended up with VitePress, but that was the framework of choice. It renders Markdown files, and also supports Vue components, which I am already familiar with. So it can easily scale up and down in complexity.

## Content

With the foundation set, I started creating the content. At first, this was just a list of apps, like we already had on our existing index page. But now I could also add links to the wiki, Discord, YouTube, etc., without writing a ton of CSS myself.

Eventually I realised I didn't really know where I was going with this though. Who is my target audience? What kind of content do I want to put here? How much should it go into detail, especially in comparison to the wiki?

I eventually chose to make the website primarily for new users, but also add all the functionality for our existing citizens, but that shouldn't be the main focus. It also shouldn't replace the wiki, but add to the available information.

## Feature Creep

As with every project, there was a steady stream of ideas. So the website that should just be "a bit more visually appealing" and "list our apps and other links" became the place where people can submit content to, fill out forms, learn about the civ and the community, etc.

The first idea (from YucaFrita) was to add Medals to the page. Medals are our concept for rewarding people for finding or doing cool stuff, for example finding a Greater Mushroom Beetle. So far, we didn't really know where to store them that would be easily accessible and structured in a way that it doesn't get too cluttered.

Everyone liked the idea of storing them here on the page. Together with that, another idea was brought up: A dedicated page for the community, listing our members and their earned medals. Since you can potentially earn a ton of medals, and the given components don't offer that much space, we just decided to create an individual page for every citizen who wanted that.

Eventually a blog section was added (what you are reading right now), a contact form, and a proper government portal with our digital services.

## Code

All this functionality isn't possible with static Markdown. So a lot of custom logic and custom UI was created to handle all the processes that are going on under the hood. From image compression for the blog section to categorisation and automation of medal rendering.

At the time of writing this (after having finished the blog submission page), the page has two forms which are used to send data to Eisvana's leadership. I already plan on adding a third one for the community pages. These forms also use a dedicated CSS framework to look pretty.

### Blog Submissions

I want to go a bit into detail on the blog submissions, since they have a lot going on. They are quite complex because the user can upload images. These images need to be inserted into the blog text. But how do you explain that to someone who has never touched Markdown? You don't. You write code that does it for them. And of course their images should also have a small filesize to not slow down the page loads.

So when you upload files, they are automatically compressed to 2MB. The page then creates URLs to display them, and gives you a button to add them to the blog text or to remove the image. It also tracks whether the image is used in the blog text or not. If it is not used, it will not send the image in the final request when you submit the post. Network bandwidth is not an infinite resource. When you remove the images, it checks which ones were removed, then revokes the associated URLs. Memory isn't an infinite resource either.

By that logic, we also shouldn't compress on image upload, but on blog submission. Since there are multiple forms in different areas of the site, it makes sense to extract the submission logic into its own component. So that component would then need to let everyone else know that it was clicked, so the parent can send the form data. While technically possible, the solution isn't very beautiful (at least in my mind). So instead, we constantly keep track of the form data and send that to the submit button component. When the user then clicks the button, the component already has all the data and just needs to make the network call.

While this is not exactly resource efficient, I think the performance loss is negligible. JS is incredibly fast these days (despite what the C and Rust people try to tell you), and you are not constantly compressing images. Building formdata from plaintext is also not exactly hard. So that was a compromise I was willing to make.

I also tried to make it possible to edit existing blogs, but you can't really get the md files back after they have been converted to HTML. So I remembered that VitePress has a feature to display an "edit" link at the bottom of each page. The only issue is that this link can be only globally be switched on, and then needs to be switched off per page. So if I have 10 pages, and only need the "edit" link on one of them, I need to put the code to disable the link on the other 9 pages. Not ideal, doesn't scale well.

But VitePress also has the ability of specifying different edit links based on certain conditions. So now the links are only available when you are in a blog post. However, all the other links still display, they just don't link anywhere. There is no option to not render them at all, so I had to use some simple CSS to hide them (luckily the `:has()` selector is now officially supported in all major browsers, so implementing that was super easy).

## Future Plans

As of right now, the website is not finished, the community page form is still missing. Also some pages need more content. But it's coming along quite nicely, and I am confident that this website can be of great use when it will eventually go live.
