import { Levels } from "./components/common/AccessLimit";
import { getInt } from "./components/helpers/Utils";


// function match(path, listOfPaths) {
//     return true;
// }
//const base = '^' + process.env.PUBLIC_URL;
const base = '^';

const all = new RegExp(base + "/notvalid|" + base + "/$|" + base + "/login");

const pl1 = new RegExp(base + "/player/|" + base + "/notifications");
const pl2 = new RegExp(base + "/tournaments/[0-9]+/teams/[0-9]+/players/edit/([0-9]+)");

const ta1 = new RegExp(base + "/tournaments/[0-9]+/teams/([0-9]+)|" + base + "/notifications|" + base + "/config/user$");
const ta2 = new RegExp(base + "/tournaments/[0-9]+/sanctions");

const an1 = new RegExp(base + "/$|" + base + "/login");

const ref1 = new RegExp(base + "/tournaments/[0-9]+/matches/[0-9]+");


function isPlayerAllowed(path) {
    const r0 = all.test(path);
    const r1 = pl1.test(path);
    const r2 = pl2.test(path);

    return r0 || r1 || r2;
}

function isRefereeAllowed(path) {
    const r0 = all.test(path);
    const r1 = ref1.test(path);

    return r0 || r1;
}

export function isTeamInAdmins(idTeam, adminTeamIds) {
    if (!adminTeamIds || adminTeamIds.length === 0) return false;

    for (let i = 0; i < adminTeamIds.length; ++i) {
        // eslint-disable-next-line eqeqeq
        if (adminTeamIds[i] == idTeam) return true;
    }

    return false;
}

function isTeamAdminAllowed(path, adminTeamIds) {
    const r0 = all.test(path);
    
    const m1 = ta1.exec(path);
    const r2 = ta2.test(path);

    let r1 = false;
    if (m1) r1 = isTeamInAdmins(m1[1], adminTeamIds);

    return r0 || r1 || r2;
}


function isAnonymousAllowed(path) {
    return an1.test(path);
}

export function validateLocation(history, auth) {
    let result = false;
    
    const userLevel = getInt(auth.level);
    const path = history.location.pathname;

    if (userLevel === Levels.OrgAdmin) return;
    if (userLevel === Levels.Referee) result = isRefereeAllowed(path);
    if (userLevel === Levels.Player) result = isPlayerAllowed(path) || isTeamAdminAllowed(path, auth.adminTeamIds);
    if (!userLevel) result = isAnonymousAllowed(path);

    if (!result) history.replace('/');
}