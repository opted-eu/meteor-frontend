import Markdown from "react-markdown";

const privacy_text = `
# Privacy Policy & Disclaimer

## Privacy Policy

This research project is conducted by the University of Vienna which hosts its privacy policy 
here: [Data Protection Declaration](https://dsba.univie.ac.at/en/privacy-policy).

## Cookies

This website only uses cookies that are technically required to ensure its functionality. 
There are no cookies for marketing purposes or third-party cookies in place.

## Disclaimer

Thank you for your interest in contributing to Meteor!

This data collection effort is part of the EU-funded Project OPTED, 
where researchers work towards the creation of a new European research 
infrastructure for the study of political communication in Europe. 
For this particular platform, we would like to invite you to help us 
collect information about various European political text resources. 
Before you start, we would like to draw your attention to a few points. 
We would kindly ask you to read the following information carefully.

### Purpose of the project
The ultimate goal is an inventory that helps researchers, journalists, 
and the interested public to extract in-depth knowledge about the 
political discourses in Europe. We specifically focus on political texts 
by various actors, including political parties, legislative texts, news media, 
as well as texts produced by citizens. While we do not host any text data, 
we provide references to where such data is available. Furthermore, we also list 
resources that are useful for studying and analyizing such texts, 
including tools and learning materials.

We are immensely grateful for your support!

### Conditions of Use and Contributions

#### Contributors’ Rights and Obligations

If you contribute to Meteor, you thereby license it to the public for reuse under [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/deed.en).
 
#### Procedures

There is a form that guides the user through the process and prompts 
for all necessary information. 

#### Personal Account as requirement to contribute data

You need to create an account on this platform before you can contribute data 
to the inventory and before you can fill out the questionnaire. 

Please note the following:

- If you choose to create an account on this platform you need to provide an email address. 
    We will store your email address for administrative purposes 
    (i.e., logging in to this platform, administering your account, correspondence strictly necessary for operation). We will not share your email address with any third-parties and it is not publicly visible.
- We reserve the right to contact our users for administrative purposes 
    using the provided email address.
- Any other personal information you add to your account (e.g., your affiliation) 
    is voluntary and optional.
- We do not collect sensitive personal information.
- We reserve the right to publicly display a username next to the information about news sources that you entered. This username is initially randomly generated and assigned automatically to your account after registration. The username is unrelated to the personal information that you provide (i.e. your email address and additional optional information). You can change the username according to your own preferences.
- We reserve the right to store your IP address for administrative and analytical purposes (e.g. preventing SPAM, or creating usage statistics)
- If you like you can close your account anytime.
- The personal information that you provide (i.e. your email address and 
    additional optional information) will be deleted immediately 
    if you choose to close your account. The information that you 
    provide about new sources will remain part of the inventory.

Once you have an account you can contribute data to the inventory:

- The data that you contribute when filling out forms 
    does not include personal or sensitive information.
- The data that you contribute when filling out forms may be made available publicly.
- Before the data is made publicly available, they will be reviewed by an editorial board.

#### General

- Data will be collected and processed exclusively on the basis of the legal provisions 
    (EU General Data Protection Regulation (GDPR), § 7 Abs 2 Datenschutzgesetz (DSG))).
- This platform uses cookies that are strictly necessary for operation. 
    We do not use any third-party cookies.
- Servers where data is stored and processed are in the European Union.

#### Potential discomforts and risks

There are no anticipated risks to your participation. 
When you feel discomfort you can stop filling out the questionnaire anytime.

#### Potential benefits to you and/or to society

The information that you contribute about European political text 
resources will be part of an inventory. Together with the information 
added by other contributors the resulting database will serve as a resource for 
various search interests.

#### Compensation for participants

There is no monetary compensation for your contribution to the project.

#### Participation and withdrawal

Contributing entries is voluntary. You can cancel contributions at any time. 
The personal information that you provide (email address as a must and 
additional optional information) will be deleted immediately 
if you choose to close your account. 
The entries you made will remain part of the inventory.

### Accessing project outomes

Your contributions to the Meteor platform will be open access -- 
i.e. pubicly available without a fee. Your deposited resources may be used 
therefore in other articles, reports or academic publications. 
We require that users, as a condition of use, agree to acknowledge the use 
of resources from the platform (see section "Conditions of Use and Contributions").

### Further information

If you have any questions or concerns about the content, purpose or research 
ethics of this platform, please feel free to contact the project manager. 
Should you have comments on the user experience please contact the technical 
manager Paul Balluff.

All comments or complaints will be treated in strict confidence.

For legal questions in connection with the General Data Protection Regulation (GDPR), 
please contact the data protection officers of the University of Vienna, 
Dr. Daniel Stanonik, LL.M. or Dr. Karsten Kinast, LL.M. (verarbeitungsverzeichnis@univie.ac.at). 
You also have the right to lodge a complaint with the data protection authority 
(e.g., via dsb@dsb.gv.at).

`

const PrivacyPolicyAndConsent = () => {
    return <Markdown>{privacy_text}</Markdown>;
};

export default PrivacyPolicyAndConsent;
