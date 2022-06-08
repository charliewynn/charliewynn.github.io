---
layout: post
title: "Birdie Buddy"
date: 2022-06-08 10:33:16 -0600
categories: coding discgolf
tags: [featured]
published: false
#image: ../assets/birdie-buddy/icon.png
---

I play disc golf regularly. In my normal group of players, we like to keep track of which holes we have birdied for our "home" courses.  
To make it easier to track I'm working on a quick app to log birdies you manage to get.

The front-end is hosting with gh-pages and written in react.
The back-end is aws lambda + cognito + dynamodb + s3.

<!--more-->

The app everyone uses for scorekeeping (UDisc) does let you see if you've birdied a hole, but it's a little tricky to look things up sometimes.
I'd like a quick way to see:

- do I have this birdie?
- does my friend have it?
- when was the last time I've birdied it?

For deploying to AWS I've set up a github action following this demonstration (https://blog.jakoblind.no/aws-lambda-github-actions/)

The back-end repo is open-source at: https://github.com/charliewynn/birdie-buddy-backend
