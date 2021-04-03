---
title: "Getting More From Your Portfolio"
excerpt: "A hassle-free, plug and play way to collect info from HTML forms"
coverImage: "/assets/blog/getting-more-from-your-portfolio/cover.jpg"
date: "2021-04-02T10:30:07.322Z"
author:
  name: Sudhanshu Ranjan
  picture: "/assets/blog/authors/me.jpg"
ogImage:
  url: "/assets/blog/getting-more-from-your-portfolio/cover.jpg"
---

### Premise:

You're a developer and you want to show your skills to the world.
You painstakingly improved your design skills to design yourself a website (or asked a friend to do it for you, or, as in [my case](https://www.sudhanshu-ranjan.tech), decided to go with someone's open-sourced design, with permission of course.)

Now the world can see what you do, your past works, your skill sets and what not. Thanks to your friend, your website has smooth animations and it is really a nice-looking, good UX-oriented page that you are really happy about.

Now, the person visiting your home-on-the-internet is pretty impressed with your portfolio and wants to contact you regarding a work opportunity, or just wants to get in touch. You have your social-links embedded in the portfolio website: [twitter](https://twitter.com/__tsuki__42), [linkedin](https://www.linkedin.com/in/perfectsudh) and all those other sites. But having to go to yet another site just to contact you is discouraging for your visitor.

However, you have thought of this already and have provided a contact-form in your website from where the visitor can contact you directly, without going anywhere else. Smart!

---

### That's where the trouble begins:

#### The problem: Managing the infrastructure to accept form-data

Here are the bare-minimum things you have to manage:

- An instance (probably on a cloud provider)
- API to connect to the website
- A database to store the records
- Certificates to secure the exposed endpoints

Now, if you want to get a little fancy, don't forget the overhead of managing the following:

- Bot protection
- Spam protection
- Exporting data in other formats, such as CSV
- Webhooks
- Email notifications

And don't even get me started on the database migration needed if you decide to add/remove/modify the form fields.

So, now you may ask, "Okay Sudhanshu, tell me, what's the alternative?"

Glad you asked.

#### The solution:

Give all this management overhead to someone else.
Enter <strong>rake.red</strong>:

> Forms for Static Pages
> Collect info from users without a server or back-end code. Receive submissions in rake.red, direct and secure.

Let me tell you their features first:

- No backend architecture required
- You add/edit/remove as many fields in the contact form as and when required
- Spam protection
- Export the records as CSV
- Webhooks to integrate it with custom-services
- If you prefer email notification, you can also turn them on

You may ask me, "What's so special about <strong>rake.red</strong>? There must be other similar services out there."
There are. Even I used to use another service (pageclip) for this.
What's so awesome about rake.red is:

- Direct integration to <strong>Discord</strong> and <strong>Slack</strong> using webhooks to get all your stuff on the platform of your choice
- Fight the bots with inbuilt `honeypot` field

I don't know about you, but these two features are what I was searching for in the other similar service. I even had to spin a server-instance just to connect to discord (Yeah, I get the irony. I chose this so that I would not have to manage a server but ended up managing a server).

---

### Conclusion:

If you want a hassle-free, plug and play way to collect info from the visitors and get all the amazing features mentioned above, go check out [rake.red](https://rake.red). All the documentation required can be found there and the app is pretty intuitive.

P.S. This post was not in any way sponsored by rake.red. These are all my personal opinions.

Credits:

- cover image by [Joanna Kosinska](https://unsplash.com/@joannakosinska)
