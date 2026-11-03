# SpendWise — Personal Budget Tracker

## Project Description
SpendWise is a responsive personal budget tracker that helps users understand their monthly money activity. It provides a financial summary, category spending breakdown, budget progress indicators and a recent-transactions list. Users can add expenses and the browser saves them locally with Local Storage.

## Technologies Used
- HTML5
- CSS3 (responsive layout, Grid and Flexbox)
- JavaScript (DOM manipulation and Local Storage)
- Google Fonts (DM Sans and Manrope)
- GitHub for source control
- Netlify for hosting and continuous deployment

## GitHub Repository Information
- Repository: https://github.com/jinarabdalla/Python_week7_assignment
- Default branch: `main`
- Visibility: Public

## Live Netlify Website URL
**To be added after the first successful Netlify deployment.**

## Deployment Process Summary
1. Keep `index.html`, `style.css`, and `script.js` in the repository root.
2. Push the complete project to the public GitHub repository.
3. Sign in to Netlify and choose **Add new site → Import an existing project**.
4. Connect GitHub and select `jinarabdalla/Python_week7_assignment`.
5. Use the `main` branch. This is a static website, so leave the build command blank and set the publish directory to `.` (the repository root).
6. Deploy the site. In **Site configuration → Domain management**, change the generated Netlify subdomain to an available name such as `spendwise-jinaro`.
7. Copy the final Netlify URL into the Live Netlify Website URL section above.
8. Test the website, then make a visible change to a project file, commit and push it to `main`. Confirm that Netlify starts and completes a new deployment automatically.

## Continuous Deployment Test
After connecting the GitHub repository, edit a visible item (for example, a dashboard heading) and push the commit to `main`. Netlify should detect the commit and publish a new deploy. Confirm the change appears on the live site.

## Final Testing Checklist
- [ ] Dashboard loads on desktop and mobile.
- [ ] Styles, fonts and JavaScript load correctly.
- [ ] Add Expense opens and closes.
- [ ] A valid expense can be saved and appears in Recent Transactions.
- [ ] Summary totals and category breakdown update.
- [ ] Refreshing the page keeps saved expenses in the same browser.
- [ ] Netlify automatic deployment succeeds after a GitHub update.

## Challenges Encountered During Deployment
The project is a static website and does not require a build step. The main deployment checks are selecting the correct repository, keeping the publish directory at the repository root, and confirming that file paths use the correct spelling and letter case. The live deployment and its final URL must be verified in the Netlify dashboard before this section is marked complete.

## Lessons Learned
- GitHub stores the project source and its version history.
- Netlify can publish a static site directly from a GitHub repository.
- A successful first deployment is only one step; the live site must also be tested.
- Continuous deployment saves time by publishing updates after commits are pushed.
- Responsive design and browser testing help make a site usable on different devices.
