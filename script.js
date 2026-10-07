/* =========================================
   STUDENT PLACEMENT DASHBOARD
========================================= */


/* =========================================
   JOB DATA
========================================= */

const jobs = [

    {
        id: 1,
        company: "TCS",
        position: "Flutter Developer",
        type: "Full Time",
        location: "Chennai",
        salary: "₹5 - 8 LPA"
    },

    {
        id: 2,
        company: "Infosys",
        position: "Software Developer",
        type: "Full Time",
        location: "Bangalore",
        salary: "₹6 - 9 LPA"
    },

    {
        id: 3,
        company: "Zoho",
        position: "Mobile App Developer",
        type: "Full Time",
        location: "Chennai",
        salary: "₹7 - 10 LPA"
    },

    {
        id: 4,
        company: "Accenture",
        position: "Frontend Developer",
        type: "Full Time",
        location: "Hyderabad",
        salary: "₹5 - 7 LPA"
    },

    {
        id: 5,
        company: "Wipro",
        position: "JavaScript Developer",
        type: "Full Time",
        location: "Pune",
        salary: "₹4 - 7 LPA"
    },

    {
        id: 6,
        company: "Cognizant",
        position: "Graduate Engineer",
        type: "Internship",
        location: "Chennai",
        salary: "₹25K / Month"
    }

];


/* =========================================
   APPLICATION DATA
========================================= */

let applications = [

    {
        company: "TCS",
        position: "Flutter Developer",
        date: "Oct 02, 2026",
        status: "Shortlisted"
    },

    {
        company: "Infosys",
        position: "Software Developer",
        date: "Oct 01, 2026",
        status: "Interview"
    },

    {
        company: "Wipro",
        position: "JavaScript Developer",
        date: "Sep 28, 2026",
        status: "Applied"
    }

];


/* =========================================
   DOM ELEMENTS
========================================= */

const loginPage = document.getElementById("loginPage");

const dashboard = document.getElementById("dashboard");

const loginForm = document.getElementById("loginForm");

const logoutBtn = document.getElementById("logoutBtn");

const togglePassword =
    document.getElementById("togglePassword");

const password =
    document.getElementById("password");

const forgotPassword =
    document.getElementById("forgotPassword");

const jobGrid =
    document.getElementById("jobGrid");

const dashboardJobs =
    document.getElementById("dashboardJobs");

const applicationTable =
    document.getElementById("applicationTable");

const jobSearch =
    document.getElementById("jobSearch");

const jobTypeFilter =
    document.getElementById("jobTypeFilter");

const locationFilter =
    document.getElementById("locationFilter");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");

const menuBtn =
    document.getElementById("menuBtn");

const sidebar =
    document.querySelector(".sidebar");


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}


/* =========================================
   LOGIN
========================================= */

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const passwordValue =
        password.value.trim();

    if (email === "" || passwordValue === "") {

        showToast("Please enter email and password.");

        return;
    }

    loginPage.classList.add("hidden");

    dashboard.classList.remove("hidden");

    showToast("Login successful!");

    renderDashboardJobs();

    renderJobs();

    renderApplications();

    updateStatistics();

});


/* =========================================
   LOGOUT
========================================= */

logoutBtn.addEventListener("click", function () {

    dashboard.classList.add("hidden");

    loginPage.classList.remove("hidden");

    loginForm.reset();

    showToast("Logged out successfully.");

});


/* =========================================
   PASSWORD SHOW / HIDE
========================================= */

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.textContent = "🙈";

    } else {

        password.type = "password";

        togglePassword.textContent = "👁";

    }

});


/* =========================================
   FORGOT PASSWORD
========================================= */

forgotPassword.addEventListener("click", function () {

    showToast("Password reset link feature is ready.");

});


/* =========================================
   SIDEBAR NAVIGATION
========================================= */

const navItems =
    document.querySelectorAll(".nav-item");

const sections =
    document.querySelectorAll(".page-section");


navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        const target =
            item.getAttribute("data-section");

        navItems.forEach(function (nav) {

            nav.classList.remove("active");

        });

        item.classList.add("active");


        sections.forEach(function (section) {

            section.classList.remove("active-section");

        });


        const targetSection =
            document.getElementById(target);

        if (targetSection) {

            targetSection.classList.add("active-section");

        }


        sidebar.classList.remove("mobile-open");

    });

});


/* =========================================
   MOBILE MENU
========================================= */

menuBtn.addEventListener("click", function () {

    sidebar.classList.toggle("mobile-open");

});


/* =========================================
   JOB CARD
========================================= */

function createJobCard(job) {

    const card =
        document.createElement("div");

    card.className = "job-card";


    card.innerHTML = `

        <div class="job-top">

            <div class="company-logo">
                ${job.company.charAt(0)}
            </div>

            <button
                class="bookmark-btn"
                onclick="bookmarkJob('${job.company}')"
            >
                ♡
            </button>

        </div>


        <h3>
            ${job.position}
        </h3>


        <p class="job-company">
            ${job.company}
        </p>


        <div class="job-info">

            <span class="job-tag">
                💼 ${job.type}
            </span>

            <span class="job-tag">
                📍 ${job.location}
            </span>

        </div>


        <div class="job-bottom">

            <span class="salary">
                ${job.salary}
            </span>

            <button
                class="apply-btn"
                onclick="applyForJob(${job.id})"
            >
                Apply Now
            </button>

        </div>

    `;


    return card;
}


/* =========================================
   RENDER JOBS
========================================= */

function renderJobs() {

    if (!jobGrid) {
        return;
    }


    const searchValue =
        jobSearch.value.toLowerCase().trim();


    const typeValue =
        jobTypeFilter.value;


    const locationValue =
        locationFilter.value;


    const filteredJobs =
        jobs.filter(function (job) {

            const matchesSearch =

                job.position
                    .toLowerCase()
                    .includes(searchValue)

                ||

                job.company
                    .toLowerCase()
                    .includes(searchValue);


            const matchesType =

                typeValue === "all"
                ||
                job.type === typeValue;


            const matchesLocation =

                locationValue === "all"
                ||
                job.location === locationValue;


            return (
                matchesSearch
                &&
                matchesType
                &&
                matchesLocation
            );

        });


    jobGrid.innerHTML = "";


    if (filteredJobs.length === 0) {

        jobGrid.innerHTML = `

            <div class="job-card">

                <h3>No jobs found</h3>

                <p class="job-company">
                    Try changing your search or filters.
                </p>

            </div>

        `;

        return;
    }


    filteredJobs.forEach(function (job) {

        jobGrid.appendChild(
            createJobCard(job)
        );

    });

}


/* =========================================
   DASHBOARD JOBS
========================================= */

function renderDashboardJobs() {

    if (!dashboardJobs) {
        return;
    }


    dashboardJobs.innerHTML = "";


    jobs.slice(0, 3).forEach(function (job) {

        dashboardJobs.appendChild(
            createJobCard(job)
        );

    });

}


/* =========================================
   SEARCH / FILTER
========================================= */

jobSearch.addEventListener(
    "input",
    renderJobs
);

jobTypeFilter.addEventListener(
    "change",
    renderJobs
);

locationFilter.addEventListener(
    "change",
    renderJobs
);


/* =========================================
   APPLY FOR JOB
========================================= */

function applyForJob(jobId) {

    const job =
        jobs.find(function (item) {

            return item.id === jobId;

        });


    if (!job) {
        return;
    }


    const alreadyApplied =
        applications.some(function (application) {

            return (
                application.company === job.company
                &&
                application.position === job.position
            );

        });


    if (alreadyApplied) {

        showToast(
            "You have already applied for this job."
        );

        return;
    }


    applications.push({

        company: job.company,

        position: job.position,

        date: "Oct 07, 2026",

        status: "Applied"

    });


    renderApplications();

    updateStatistics();


    showToast(
        `Application submitted to ${job.company}!`
    );

}


/* =========================================
   APPLICATION TABLE
========================================= */

function renderApplications() {

    applicationTable.innerHTML = "";


    applications.forEach(function (application) {

        const row =
            document.createElement("tr");


        let statusClass =
            "status-applied";


        if (
            application.status === "Shortlisted"
        ) {

            statusClass =
                "status-shortlisted";

        }


        if (
            application.status === "Interview"
        ) {

            statusClass =
                "status-interview";

        }


        if (
            application.status === "Selected"
        ) {

            statusClass =
                "status-selected";

        }


        row.innerHTML = `

            <td>
                <strong>
                    ${application.company}
                </strong>
            </td>

            <td>
                ${application.position}
            </td>

            <td>
                ${application.date}
            </td>

            <td>

                <span
                    class="application-status ${statusClass}"
                >
                    ${application.status}
                </span>

            </td>

        `;


        applicationTable.appendChild(row);

    });

}


/* =========================================
   UPDATE STATISTICS
========================================= */

function updateStatistics() {

    const total =
        applications.length;


    const shortlisted =
        applications.filter(function (application) {

            return application.status === "Shortlisted";

        }).length;


    const interviews =
        applications.filter(function (application) {

            return application.status === "Interview";

        }).length;


    const selected =
        applications.filter(function (application) {

            return application.status === "Selected";

        }).length;


    document.getElementById(
        "totalApplications"
    ).textContent = total;


    document.getElementById(
        "shortlistedCount"
    ).textContent = shortlisted;


    document.getElementById(
        "interviewCount"
    ).textContent = interviews;


    document.getElementById(
        "selectedCount"
    ).textContent = selected;


    document.getElementById(
        "analyticsApplications"
    ).textContent = total;


    const shortlistRate =
        total === 0
            ? 0
            : Math.round(
                (shortlisted / total) * 100
            );


    const interviewRate =
        total === 0
            ? 0
            : Math.round(
                (interviews / total) * 100
            );


    document.getElementById(
        "shortlistRate"
    ).textContent =
        shortlistRate + "%";


    document.getElementById(
        "interviewRate"
    ).textContent =
        interviewRate + "%";

}


/* =========================================
   BOOKMARK
========================================= */

function bookmarkJob(company) {

    showToast(
        `${company} added to bookmarks.`
    );

}


/* =========================================
   NOTIFICATION BUTTON
========================================= */

document
    .getElementById("notificationBtn")
    .addEventListener("click", function () {

        document
            .querySelector('[data-section="notificationsSection"]')
            .click();

    });


/* =========================================
   MARK ALL NOTIFICATIONS READ
========================================= */

document
    .getElementById("markAllRead")
    .addEventListener("click", function () {

        const notifications =
            document.querySelectorAll(
                ".notification-card"
            );


        notifications.forEach(function (notification) {

            notification.classList.remove(
                "unread"
            );

        });


        document.querySelector(
            ".notification-count"
        ).textContent = "0";


        document.querySelector(
            ".notification-button span"
        ).textContent = "0";


        showToast(
            "All notifications marked as read."
        );

    });


/* =========================================
   EDIT PROFILE
========================================= */

document
    .getElementById("editProfileBtn")
    .addEventListener("click", function () {

        showToast(
            "Profile editing feature is ready."
        );

    });


/* =========================================
   VIEW ALL BUTTON
========================================= */

document
    .querySelectorAll("[data-go]")
    .forEach(function (button) {

        button.addEventListener("click", function () {

            const target =
                button.getAttribute("data-go");


            document
                .querySelector(
                    `[data-section="${target}"]`
                )
                .click();

        });

    });


/* =========================================
   INITIAL LOAD
========================================= */

renderDashboardJobs();

renderJobs();

renderApplications();

updateStatistics();