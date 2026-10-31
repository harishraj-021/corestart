# Corestart
Electronics and embedded early-career discovery site, ready for Vercel.

## Deploy
Import this folder as a new Vercel project, choose framework Other, no build command, and the project root as output. Alternatively, use an authenticated Vercel CLI: `vercel --prod` from this directory. Requires permission to create projects in your selected team. Node 22 is configured. No API keys or dependencies required.

## Features and coverage
- Embedded/firmware, electronics/PCB, VLSI/FPGA, validation, IoT searches.
- India and city filters; worldwide option.
- LinkedIn, Naukri and Indeed outbound searches; Internshala embedded category directory.
- Nine official company career portals. These links are directories, not claimed vacancies.
- Live server-side Greenhouse feeds from Tenstorrent and Tenstorrent University. Title-based early-career classification is a heuristic, not confirmed eligibility. There may be zero matching India roles.
- Saved opportunities, manual job URL entry, application statuses and CSV export. Browser-local storage only; no account sync.
- Apply links open the original employer page. No automatic application submission.

## Verification
Run `node --test tests.cjs`. Syntax checks and two tests passed during creation. Production deployment was blocked by Vercel's project-creation permission error (403); live deployment has not been completed. The interface was inspected in a static browser preview; the live backend was checked separately and both feeds returned successfully (6 matching roles before location filters). External feed availability depends on the deployment network and upstream source.

## Extend
Add supported public boards in api/jobs.js. For LinkedIn/Naukri in-app aggregation, an approved data integration is required; this version does not scrape those portals. Review each source's current integration terms before adding adapters.
