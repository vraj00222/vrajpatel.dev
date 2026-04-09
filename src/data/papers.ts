export interface Paper {
  title: string;
  authors: string;
  venue: string;
  year: number;
  url: string;
}

export interface PaperCategory {
  label: string;
  papers: Paper[];
}

export const READING: PaperCategory[] = [
  {
    label: "OS Fundamentals",
    papers: [
      { title: "Operating Systems", authors: "R. Finkel", venue: "ACM Comput. Surv.", year: 1996, url: "https://doi.org/10.1145/234313.234399" },
      { title: "Process Synchronization and IPC", authors: "C. Wills", venue: "ACM Comput. Surv.", year: 1996, url: "https://doi.org/10.1145/234313.234401" },
      { title: "Virtual Memory", authors: "P. Denning", venue: "ACM Comput. Surv.", year: 1996, url: "https://doi.org/10.1145/234313.234403" },
      { title: "Secondary Storage and Filesystems", authors: "M. K. McKusick", venue: "ACM Comput. Surv.", year: 1996, url: "https://doi.org/10.1145/234313.234404" },
      { title: "Real-Time and Embedded Systems", authors: "J. Stankovic", venue: "ACM Comput. Surv.", year: 1996, url: "https://doi.org/10.1145/234313.234400" },
    ],
  },
  {
    label: "Classic OS Design",
    papers: [
      { title: "The UNIX Time-Sharing System", authors: "D. Ritchie, K. Thompson", venue: "Commun. ACM", year: 1974, url: "https://doi.org/10.1145/361011.361061" },
      { title: "Pilot: An OS for a Personal Computer", authors: "D. Redell et al.", venue: "Commun. ACM", year: 1980, url: "https://doi.org/10.1145/358818.358822" },
      { title: "The Oberon System", authors: "N. Wirth, J. Gutknecht", venue: "Softw. Pract. Exper.", year: 1989, url: "https://doi.org/10.1002/spe.4380190905" },
      { title: "The Oberon System Family", authors: "M. Brandis et al.", venue: "Softw. Pract. Exper.", year: 1995, url: "https://doi.org/10.1002/spe.4380251204" },
      { title: "Plan 9 from Bell Labs", authors: "R. Pike et al.", venue: "Computing Systems", year: 1995, url: "https://www.usenix.org/legacy/publications/compsystems/1995/sum_pike.pdf" },
      { title: "Why Some Dead OSes Still Matter", authors: "A. Mirtchovski, L. Ionkov", venue: ";login:", year: 2007, url: "https://www.usenix.org/system/files/login/articles/546-mirtchovski.pdf" },
      { title: "Designing and Implementing Choices: An OO System in C++", authors: "R. Campbell et al.", venue: "Commun. ACM", year: 1993, url: "https://doi.org/10.1145/162685.162717" },
    ],
  },
  {
    label: "Microkernels & IPC",
    papers: [
      { title: "Mach: A New Kernel Foundation for UNIX Development", authors: "M. Accetta et al.", venue: "USENIX Summer", year: 1986, url: "https://cseweb.ucsd.edu/classes/wi11/cse221/papers/accetta86.pdf" },
      { title: "Improving IPC by Kernel Design", authors: "J. Liedtke", venue: "SOSP '93", year: 1993, url: "https://doi.org/10.1145/168619.168633" },
      { title: "From L3 to seL4: 20 Years of L4 Microkernels", authors: "K. Elphinstone, G. Heiser", venue: "SOSP '13", year: 2013, url: "https://doi.org/10.1145/2517349.2522720" },
      { title: "EROS: A Fast Capability System", authors: "J. Shapiro et al.", venue: "SOSP '99", year: 1999, url: "https://doi.org/10.1145/319151.319163" },
      { title: "The Singularity System", authors: "J. Larus, G. Hunt", venue: "Commun. ACM", year: 2010, url: "https://doi.org/10.1145/1787234.1787253" },
      { title: "The Flux OS Toolkit: Reusable Components for OS Implementation", authors: "B. Ford et al.", venue: "HotOS '97", year: 1997, url: "https://doi.org/10.1109/HOTOS.1997.595175" },
      { title: "Sharing and Protection in a Single-Address-Space OS", authors: "J. Chase et al.", venue: "ACM Trans. Comput. Syst.", year: 1994, url: "https://doi.org/10.1145/195792.195795" },
      { title: "CuriOS: Improving Reliability Through OS Structure", authors: "F. David et al.", venue: "OSDI '08", year: 2008, url: "https://www.usenix.org/legacy/events/osdi08/tech/full_papers/david/david.pdf" },
      { title: "Scriptable Operating Systems with Lua", authors: "L. Vieira Neto et al.", venue: "DLS '14", year: 2014, url: "https://doi.org/10.1145/2661088.2661096" },
    ],
  },
  {
    label: "Virtualization & Containers",
    papers: [
      { title: "NUMA (Non-Uniform Memory Access): An Overview", authors: "C. Lameter", venue: "ACM Queue", year: 2013, url: "https://doi.org/10.1145/2508834.2513149" },
      { title: "Xen and the Art of Virtualization", authors: "P. Barham et al.", venue: "SOSP '03", year: 2003, url: "https://doi.org/10.1145/945445.945462" },
      { title: "Firecracker: Lightweight Virtualization for Serverless", authors: "A. Agache et al.", venue: "NSDI '20", year: 2020, url: "https://www.usenix.org/system/files/nsdi20-paper-agache.pdf" },
      { title: "Blending Containers and Virtual Machines: Firecracker and gVisor", authors: "Anjali et al.", venue: "VEE '20", year: 2020, url: "https://doi.org/10.1145/3381052.3381315" },
      { title: "The Ideal Versus the Real: Revisiting the History of VMs and Containers", authors: "A. Randal", venue: "ACM Comput. Surv.", year: 2020, url: "https://doi.org/10.1145/3365199" },
      { title: "My VM is Lighter (and Safer) than your Container", authors: "F. Manco et al.", venue: "SOSP '17", year: 2017, url: "https://doi.org/10.1145/3132747.3132763" },
    ],
  },
  {
    label: "Exokernels & Library OSes",
    papers: [
      { title: "Exokernel: An OS Architecture for Application-Level Resource Management", authors: "D. Engler et al.", venue: "SOSP '95", year: 1995, url: "https://doi.org/10.1145/224056.224076" },
      { title: "Rethinking the Library OS from the Top Down", authors: "D. Porter et al.", venue: "ASPLOS XVI", year: 2011, url: "https://doi.org/10.1145/1950365.1950399" },
      { title: "Unikernels: Library Operating Systems for the Cloud", authors: "A. Madhavapeddy et al.", venue: "ASPLOS '13", year: 2013, url: "https://doi.org/10.1145/2451116.2451167" },
    ],
  },
  {
    label: "Distributed Systems",
    papers: [
      { title: "Distributed Operating Systems", authors: "S. Mullender", venue: "ACM Comput. Surv.", year: 1996, url: "https://doi.org/10.1145/234313.234407" },
      { title: "Distributed File Systems and Distributed Memory", authors: "T. Doeppner", venue: "ACM Comput. Surv.", year: 1996, url: "https://doi.org/10.1145/234313.234409" },
      { title: "Distributed and Multiprocessor Scheduling", authors: "S. Chapin", venue: "ACM Comput. Surv.", year: 1996, url: "https://doi.org/10.1145/234313.234410" },
      { title: "VAXcluster: A Closely-Coupled Distributed System", authors: "N. Kronenberg et al.", venue: "ACM Trans. Comput. Syst.", year: 1986, url: "https://doi.org/10.1145/214419.214421" },
      { title: "Amoeba: A Distributed Operating System for the 1990s", authors: "S. Mullender et al.", venue: "IEEE Computer", year: 1990, url: "https://doi.org/10.1109/2.53354" },
      { title: "A Comparison of Two Distributed Systems: Amoeba and Sprite", authors: "F. Douglis et al.", venue: "Computing Systems", year: 1991, url: "https://www.usenix.org/legacy/publications/compsystems/1991/fall_douglis.pdf" },
      { title: "The Multikernel: A New OS Architecture for Scalable Multicore Systems", authors: "A. Baumann et al.", venue: "SOSP '09", year: 2009, url: "https://doi.org/10.1145/1629575.1629579" },
    ],
  },
];

export const TOTAL_PAPERS = READING.reduce((sum, cat) => sum + cat.papers.length, 0);
