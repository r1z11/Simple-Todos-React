import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/db/TasksCollection";
import { Accounts } from "meteor/accounts-base";
import { ServiceConfiguration } from 'meteor/service-configuration';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';


const SEED_USERNAME = "eric";
const SEED_PASSWORD = "eric";

const insertTask = (taskText) => TasksCollection.insert({ text: taskText });

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (TasksCollection.find().count() === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach((taskText) => insertTask(taskText, user));
  }

  ServiceConfiguration.configurations.upsert(
    { service: "github" },
    {
      $set: {
        loginStyle: "popup",
        clientId: "4ecad0866680ed0a9f5d", // insert your clientId here
        secret: "215009da01fb3f9cb98745b255f0228f57f00e69", // insert your secret here
      },
    }
  );
});
