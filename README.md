# Backend Development Workshop
###### Presented at 12pm on June 18th, 2022 (EDT)

Learn how to quickly plan, build, and deploy a backend in Python using Flask, and then integrate it with a React frontend.
In this workshop you will learn to create a todo list webapp complete with lists and tags.

**Note**: This workshop will NOT teach you how to build the frontend. We will just be connecting the frontend to the backend.

Once the workshop has concluded, each stage will be available in the following branches:
- [stage-1](https://github.com/akrantz01/wafflehacks-2022-fullstack-workshop/tree/stage-1): dictionary storage 
- [stage-2](https://github.com/akrantz01/wafflehacks-2022-fullstack-workshop/tree/stage-2): database storage
- [stage-3](https://github.com/akrantz01/wafflehacks-2022-fullstack-workshop/tree/stage-3): adding lists
- [stage-4](https://github.com/akrantz01/wafflehacks-2022-fullstack-workshop/tree/stage-4): adding tags
- [stage-5](https://github.com/akrantz01/wafflehacks-2022-fullstack-workshop/tree/stage-5): deployment
- [everything](https://github.com/akrantz01/wafflehacks-2022-fullstack-workshop/tree/everything): everything, including the frontend and database resetting service 


### Pre-requisites
- [Python 3](https://www.python.org) installed (>= 3.8)
- An IDE you're comfortable using ([PyCharm](https://www.jetbrains.com/pycharm/), [VSCode](https://code.visualstudio.com/), [Atom](https://atom.io/), etc.)
- A [Railway](https://railway.app) account
- The `railway` tool [installed](https://docs.railway.app/develop/cli#install) and [authenticated](https://docs.railway.app/develop/cli#login)


### Deployment

To deploy this application on [Railway](https://railway.app), use the following steps:

1. Initialize a project: `railway init`
   - Select `Empty Project` for your starting point
   - Give your project an awesome name
   - If prompted, don't import your environment variables
2. Add a PostgreSQL database: `railway add`
   - Select `postgresql` from the list
3. Deploy your app: `railway up`
4. Generate a domain for your application
   - Go to your project page
   - Click on the service with your project's name
   - Go to the service's settings
   - Under the `Environment` heading, click on `Generate Domain`
5. Your application is now deployed!!
   - If you go to your domain, you will get a page not found -- this is expected
   - Try going to one of the routes you defined in earlier stages


#### Troubleshooting

If your deployment is successful, but you keep getting a screen similar to the following:

![](https://i.imgur.com/25SEfg4.png)

Try running `railway up` again.
