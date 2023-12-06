import Markdown from "react-markdown";

const general_guide = `
# General Guide for adding new Entries

Thank you for contributing!

## What is included in Meteor?

Before you start, please carefully read the following instructions to learn about the kind of resources we are looking for:
Political texts are nowadays produced by diverse groups of actors and are accessible in various formats and via various channels. For Meteor, we focus on resources for researching political texts.
Important, we look for:

- Resources mainly associated with EU countries + UK, Switzerland, Norway, and Israel.
- Datasets, corpora, or archives that include text data (no matter how big or small)
- Text analysis tools: any kind of digital resources that enable some form of text analysis.
- Political parties, governments, parliaments: we already cover a large number of political actors in Europe, but there might be a few missing. We are happy to include more in Meteor.
- Scientific Publications: any form of published research that investigates political texts in Europe. With Meteor, we can link datasets, tools, political parties, and research with each other and build a large knowledge graph.
- Learning Materials that help understanding and analysing text data. This can be digital resources such as tutorials for a particular tool orguides for a dataset. 
- User Collections: you can also add your own collection of resources here in Meteor and share it with other users. Creative collections are very welcome.
- Please provide information about the resources that are correct for the moment (to the best of your knowledge) in which you enter the information.

Please note, Meteor does not host datasets, or corpora, or papers. We mainly link to content hosted elsewhere.

`

const Guides = () => {
    return <Markdown>{general_guide}</Markdown>;
};

export default Guides;
