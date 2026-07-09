---
id: efsp_overview 
title: E-filing with the Document Assembly Line
sidebar_label: EFSP overview
slug: overview
---

## Overview

The Suffolk LIT Lab has created a tool to let guided interview authors add
one-click delivery of documents directly to the court's electronic docket.

This section talks about how to use our tools whether you are:

* an interview author using the Document Assembly Line framework, or
* the owner of a third-party document assembly platform who can integrate with a
  modern REST API

### What is e-filing?

E-filing is the process of delivering a document directly to a court's case
management system, usually with some extra information or _metadata_. The
metadata can include things like a case number, the names of parties, and codes
that tell a clerk what kind of filing is being delivered.

E-filing **replaces** delivering documents to the court by hand, mail, or
courier.

Traditionally, e-filing requires visiting a dedicated web page, creating an
account, converting documents into PDF format, and then inputting a lot of
confusing information, such as document type, filing codes, and court codes.

The LIT Lab's primary tool is code that guided interview authors can incorporate
to add a **simple one-click e-file button** into an existing guided interview.
The interview author can pre-select or help the litigant select the proper
codes. This removes the most challenging part of traditional e-filing. If the
litigant qualifies for a fee waiver, they may not even be required to create an
account.

We have also created a very simple e-filing "portal" that works much like
traditional e-filing websites. This is not a product we expect end-users to
interact with just yet.

There are many competing systems of e-filing, but often there is a **monopoly**
vendor within a given jurisdiction. Often, the vendor may have a program that
allows third-parties to deliver documents to the vendor. Then, the vendor takes
care of delivering the document the rest of the way to the court's docket.

[![](https://mermaid.ink/img/pako:eNqFkD9vgzAQR7_KyVMrhaHtxlApAVpFylA1bIHhYh9g4T_I2K0i4LvXNO0WKTfd8N4bfhPjVhBLWetw6KDMKwPxtqf3IAUJkMaT-5L0XUOSvM6fxbGE7ccerANhOY4j6bMiGJD32NIMu4fDvoQDnh-vod2qQTaVF0UOSuKdscq2ksblCmS_3UIR984ayddsT36G_NRg2mCi0AiNrofMBufhqb7jFbe953ve223vpWYbpslplCLONK2VivmONFUsja-gBoPyFavMEtEwCPRUCOmtY7GnRtowDN4eL4az1LtA_1AuMa6u_6jlBzqehAQ)](https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNqFkD9vgzAQR7_KyVMrhaHtxlApAVpFylA1bIHhYh9g4T_I2K0i4LvXNO0WKTfd8N4bfhPjVhBLWetw6KDMKwPxtqf3IAUJkMaT-5L0XUOSvM6fxbGE7ccerANhOY4j6bMiGJD32NIMu4fDvoQDnh-vod2qQTaVF0UOSuKdscq2ksblCmS_3UIR984ayddsT36G_NRg2mCi0AiNrofMBufhqb7jFbe953ve223vpWYbpslplCLONK2VivmONFUsja-gBoPyFavMEtEwCPRUCOmtY7GnRtowDN4eL4az1LtA_1AuMa6u_6jlBzqehAQ)

If you think of the e-filing vendor as a corporate mail room, then third-party
vendors like the Suffolk LIT Lab are the equivalent of UPS or FedEx. We just get
the document to the building. The e-filing vendor handles getting it to the
right desk. **From a court clerk's point of view, the filing looks just like a
filing uploaded through the vendor's first-party system.**

### Which courts can the LIT Lab's product talk to?

The LIT Lab is a certified EFSP, or Electronic Filing Service Provider, for the
[Tyler Technologies](https://www.tylertech.com/products/odyssey/file-serve)
system. We have a signed agreement with Illinois, and have finished the
technical qualifications to file in these additional Tyler states:

* **Illinois** (fully certified with Tyler and executed agreement with court)
* California
* Georgia
* Indiana
* Maryland (requires a separate bond)
* Minnesota
* New Hampshire
* Texas (requires separate but identical technical certification)

While the states listed above have third-party e-filing arrangements in place
and we have been certified on a technical level to participate, there may be
additional requirements from the court for us to start filing documents in
states other than Illinois.

There are additional states that use Tyler as the monopoly vendor but do not
have a current EFSP agreement in place. In two states Suffolk LIT Lab has
started conversations to be the first participants in a new EFSP program.

The LIT Lab also has a bespoke integration with [Jefferson
Parish's
JeffNet](https://www.jpclerkofcourt.us/courts/24th-judicial-district-court/e-filing/),
an in-house e-filing tool built for **Jefferson Parish, Louisiana**.

We are vendor neutral and interested in working with developers to add support
for additional e-filing systems if it makes sense. This is most likely to work
if we can play a support and documentation role and the primary development
happens by an outside party.

### Why use integrated e-filing?

Litigants often find **filing** a case to be one of the most confusing parts of
starting a new case. Integrating filing with a guided interview simplifies the
litigant's experience dramatically. The interview author can pre-define the
answers to a lot of questions the litigant would otherwise need to provide in
traditional e-filing.

In addition to helping with the filing process, our e-filing system allows
litigants to lookup court information, electronically serve the other party, and
to look up information from existing cases.

## Using the LIT Lab's product

The LIT Lab has actually created three products that operate at different layers
to connect with Tyler Technologies and JeffNet:

1. A [REST API](https://github.com/SuffolkLITLab/EfileProxyServer) provided by a
   Java server that speaks directly to Tyler and JeffNet
1. A [Python
   package](https://github.com/SuffolkLITLab/docassemble-EFSPIntegration) that
   provides a python-native interface to the REST API
1. A [docassemble YAML
   file](https://github.com/SuffolkLITLab/docassemble-EFSPIntegration/blob/main/docassemble/EFSPIntegration/data/questions/efiling_integration.yml)
   that uses the Python code to provide an end-to-end filing solution.

Many states are also interested in the accessibility of guided interview that
use an e-filing integration. We have produced a
[test suite](../ALKiln/automated_testing.mdx) that can provide automated
accessibility information to audit docassemble interview compliance with WCAG 2.0 and 2.1's A and AA certification levels.

### For users of the Assembly Line framework

If you are an interview author using the Assembly Line Framework, using the LIT
Lab EFSP can be as simple as adding an `include` statement to your [docassemble
interview
YAML](https://github.com/SuffolkLITLab/docassemble-EFSPIntegration/blob/main/docassemble/EFSPIntegration/data/questions/efiling_integration.yml)
and specifying a few variables, such as the filing code.

[Get started integrating with docassemble](efiling_through_docassemble.md).

If you want to use features in any way that is different to our implementation
in our Assembly Line-focused YAML file, you can use the Python library or the
REST API directly for advanced features.

In order to pass certification, we had to implement a user interface to all of
the features in the Tyler Technologies suite. We did that in a [docassemble
interview](https://github.com/SuffolkLITLab/docassemble-EFSPIntegration/blob/main/docassemble/EFSPIntegration/data/questions/any_filing_interview.yml)
that we have made open source, so there is likely sample code for most use
cases.

### For owners of third-party document assembly platforms

If you are the owner of a third-party document assembly platform, such as [A2J
Author](https://a2jauthor.org), you will want to skip the Python and docassemble
packages and write code that speaks directly to our [Java REST
endpoint](https://github.com/SuffolkLITLab/EfileProxyServer/).

This may require understanding some of the Tyler or JeffNet business rules. The
docassemble interview may be a useful reference guide as a supplement to the EFSP
server documentation.

## Technical information

Both Tyler Technologies and JeffNet use the [ECF
v4.0](http://docs.oasis-open.org/legalxml-courtfiling/specs/ecf/v4.01/ecf-v4.01-spec/os/ecf-v4.01-spec-os.html)
"envelope" as a wrapper around filed documents and metadata.

Below is a broad diagram of the entities that the e-filing feature interacts with.

![A diagram of the e-filing proxy server interacting with the EFSP docassemble package, and courts](../../assets/efile_broad_arch.svg)

### E-file Proxy Server

The biggest part of the e-filing feature is the [E-file Proxy Server](https://github.com/SuffolkLITLab/EfileProxyServer), a docker packaged Java server that converts docassemble variables into ECF XML types and communicates with courts either over REST or SOAP.

You can host the proxy server on the same machine as a docassemble server, using docker-compose, or set up a separate HTTPS enabled server that serves multiple docassemble servers.

Currently, only the Suffolk LIT Lab has permission from Tyler to host and run
the proxy server.

Further documentation on using the Proxy Server can be found [on Github](https://github.com/SuffolkLITLab/EfileProxyServer/tree/main/docs).

### EFSP docassemble Package

There is also a [companion python
package](https://github.com/SuffolkLITLab/docassemble-EFSPIntegration) to the
Proxy Server that is intended to simplify the communication from the docassemble
interview to the proxy server. It provides a python API to the Proxy Server, and
handles more advanced docassemble features for you.

The EFSP package also contains a generic filing interview that can be used an example of how to work with the python API.

:::warning
The generic filing interview is made for development purposes, and not intended for non-expert (legal or technical) use.
:::

### Handling cases with fees

Some cases require fees. In Louisiana's Jefferson Parish, the court prefers to
collect fees after the case is filed.

In jurisdictions that use the Tyler Technologies EFM, fees can be collected at
the time the case is filed. Collection of payment information happens on a page
entirely controlled by Tyler technologies. Interviews request a fee calculation,
pass off control to the Tyler Payment Gateway, and then once payment is
completed control passes back to the interview.

The Suffolk e-filing server also allows filing cases with a fee waiver. Some
courts may require that the litigant provide payment information even if they
have filed a fee waiver. That can be a court-by-court decision.

**Payment information is never stored on the Suffolk e-filing server, or inside
the guided interview.**

Below is a technical diagram showing the fee collection process:

[![](https://mermaid.ink/img/pako:eNplkctuwjAQRX9l5G3JD3jBplBUdVGksMxmiG_Akh_gR6sI8e91SkCm9crSnHt9bF9E7xWEFBHnDNdjpfkQ2HaOylr5nmOE3Rs0y-XL-q3dUovwhSCpzXurEzEN2mh3uAUqYgrsRjOhr2z6bDiBBiDeyN9RU6DmqXV31JHKoaBQhHRArDJ1-5Ss9CS9kwMUnXi0cIm0G3ywnLR3_-_ycKPtjG-K3TePkjZIj44heEs5IlTKfxNT15PHff75QdUSC2FRfLQqb32Z-jqRjrDohCxbhYGzSZ3o3LWg-aRK-1rp5IOQA5uIheCcfDu6XsgUMu7Q_F8zdf0BXUKbJA)](https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNplkctuwjAQRX9l5G3JD3jBplBUdVGksMxmiG_Akh_gR6sI8e91SkCm9crSnHt9bF9E7xWEFBHnDNdjpfkQ2HaOylr5nmOE3Rs0y-XL-q3dUovwhSCpzXurEzEN2mh3uAUqYgrsRjOhr2z6bDiBBiDeyN9RU6DmqXV31JHKoaBQhHRArDJ1-5Ss9CS9kwMUnXi0cIm0G3ywnLR3_-_ycKPtjG-K3TePkjZIj44heEs5IlTKfxNT15PHff75QdUSC2FRfLQqb32Z-jqRjrDohCxbhYGzSZ3o3LWg-aRK-1rp5IOQA5uIheCcfDu6XsgUMu7Q_F8zdf0BXUKbJA)