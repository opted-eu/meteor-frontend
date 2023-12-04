import Markdown from "react-markdown";

const faq_text = `
# FAQ

## Completeness & Scope

**How come *X* is not included in Meteor?**

**Answer:** *X* is not included, because no one added it yet. If you think it should be in *Meteor*, go ahead and make a new entry!

**How come *X* is in Meteor, but *Y* is not?**

**Answer:** Just because someone already added *X* does not mean that *Y* should not be included. So you can go ahead and make a new entry.

**Will Meteor ever be complete?**

**Answer:** Achieving full coverage is a difficult task, but we are optimistic that we will cover the most important organizations, datasets, archives, corpora, and text analysis tools.
We also hope that individuals will share their knowledge and expertise with the researcher community and add entries.

**I found a mistake! Does it mean that the information in Meteor is inaccurate?**

**Answer:** Although we carefully review every new entry, there is still a chance that there are small mistakes here and there. 
Often, the news source or organization has changed since it was entered, or sometimes it is very difficult to find reliable and accurate information. 
If you find a mistake, you can let us know and we are happy to fix it!



## Geography

**What is the scope of OPTED?**

**Answer**: EU member states + UK, Switzerland, Norway, Israel.

**How can I code a news source that is prepared (stories, perspectives) for the audience in a country that is part of the inventory scope, but also includes content that is explicitly targeting a country that cannot be selected?**

*For example, a news source is targeting an audience in Spain (a country in OPTED's scope) but also explicitly includes content for an audience in Andorra (not in OPTED's scope)?*

**Anwer:** If a news source has a clear additional focus on an audience
outside of OPTED's scope (e.g., by reporting about stories happening in
Andorra), such a source is coded as **multinational**. This is step 1.
Step 2 is the selection of the multiple nations.

Normally, one would code here now 2 countries, "Spain" and "Andorra".
Since our inventory is mainly focused on EU courses and Andorra is not
part of the OPTED countries, you can not select it manually here. In
this special case, please add the information "has also main focus on
Andorra" in the other notes section before you submit your entry.


`

const Faq = () => {
    return <Markdown>{faq_text}</Markdown>;
};

export default Faq;
