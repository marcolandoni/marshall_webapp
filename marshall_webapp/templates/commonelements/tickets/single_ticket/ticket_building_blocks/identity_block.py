#!/usr/local/bin/python
# encoding: utf-8
"""
identity_block.py
=================
:Summary:
    The identity block for the object ticket

:Author:
    David Young

:Date Created:
    November 20, 2013

:Notes:
    - If you have any questions requiring this script/module please email me: d.r.young@qub.ac.uk

:Tasks:
"""
################# GLOBAL IMPORTS ####################

import re
import datetime
import sys
import os
import string
import khufu

from .....commonelements import commonutils as cu


###################################################################
# PUBLIC FUNCTIONS                                                #
###################################################################
# LAST MODIFIED : November 20, 2013
# CREATED : November 20, 2013
# AUTHOR : DRYX


def identity_block(
        log,
        request,
        discoveryDataDictionary,
        objectAkas):
    """get ticket identity block

    **Key Arguments:**
        - ``log`` -- logger
        - ``request`` -- the pyramid request
        - ``discoveryDataDictionary`` -- a dictionary of the discovery data for this transient.
        - ``objectAkas`` -- the object akas

    **Return:**
        - ``identity_block`` -- the ticket identity block for the pesssto object

    **Todo**
    """
    log.info('starting the ``identity_block`` function')

    skymapperPopover = khufu.popover(
        tooltip=True,
        placement="bottom",  # [ top | bottom | left | right ]
        trigger="hover",  # [ False | click | hover | focus | manual ]
        title="""username: 'pessto' password: '!explosions'""",
        content=False,
        delay=200
    )

    title = cu.block_title(
        log,
        title="identity"
    )

    q = discoveryDataDictionary['marshallWorkflowLocation'].lower()

    icon = ""
    if q == "inbox":
        icon = """<i class="icon-inbox"></i>"""
    elif q == "review for followup":
        icon = """<i class="icon-eye"></i>"""
    elif q == "following":
        icon = """<i class="icon-pin"></i>"""
    elif q == "archive":
        icon = """<i class="icon-archive"></i>"""
    elif q == "pending observation":
        icon = """<i class="icon-target2"></i>"""
    elif q == "followup complete":
        icon = """<i class="icon-checkmark-circle"></i>"""

    icon = khufu.coloredText(
        text=icon,
        color="green",
        size=4,  # 1-10
        pull=False,  # "left" | "right"
    )

    surveyObjectUrl = discoveryDataDictionary["surveyObjectUrl"]
    if surveyObjectUrl and "portal.nersc.gov/" in surveyObjectUrl:
        user = request.registry.settings["credentials"]["lsq"]["username"]
        pwd = request.registry.settings["credentials"]["lsq"]["password"]
        surveyObjectUrl = surveyObjectUrl.replace(
            "portal.", "%(user)s:%(pwd)s@portal." % locals())

    if surveyObjectUrl and ("ps13pi" in surveyObjectUrl):
        user = request.registry.settings["credentials"]["ps1-3pi"]["username"]
        pwd = request.registry.settings["credentials"]["ps1-3pi"]["password"]
        surveyObjectUrl = surveyObjectUrl.replace(
            "star.", "%(user)s:%(pwd)s@star." % locals())

    if surveyObjectUrl and ("ps1fgss" in surveyObjectUrl):
        user = request.registry.settings["credentials"]["ps1-fgss"]["username"]
        pwd = request.registry.settings["credentials"]["ps1-fgss"]["password"]
        surveyObjectUrl = surveyObjectUrl.replace(
            "star.", "%(user)s:%(pwd)s@star." % locals())

    # MASTER NAME
    masterName = discoveryDataDictionary["masterName"]
    name = masterName
    if discoveryDataDictionary["survey"]:
        survey = discoveryDataDictionary["survey"].upper()
    else:
        survey = ""

    if surveyObjectUrl:
        if "skymapper" in surveyObjectUrl:
            popover = skymapperPopover
        else:
            popover = False

        masterNameLink = khufu.a(
            content=discoveryDataDictionary["masterName"],
            href=surveyObjectUrl,
            openInNewTab=True,
            popover=popover
        )
    else:
        masterNameLink = discoveryDataDictionary["masterName"]

    numerator = 70.
    if discoveryDataDictionary["classifiedFlag"]:
        numerator = 60.

    size = int(numerator / len(discoveryDataDictionary["masterName"]))
    if size > 6:
        size = 6

    masterName = khufu.coloredText(
        text="""%(masterNameLink)s""" % locals(),
        color="green",
        size=size,  # 1-10
        pull=False,  # "left" | "right"
    )

    masterName = """%(icon)s %(masterName)s""" % locals()

    masterName = khufu.grid_row(
        responsive=True,
        columns=masterName,
        htmlId=False,
        htmlClass="name",
        onPhone=True,
        onTablet=True,
        onDesktop=True
    )

    # IMAGE STAMP
    transient_cache = request.static_path(
        "marshall_webapp:static/caches/transients/")
    download_prefix = "/static/caches/transients/"
    src = "holder.js/200x60/gray/text:no image stamps available"
    dsrc = src

    if discoveryDataDictionary["ps1_target_stamp"]:
        stampName = "ps1_target_stamp.jpeg"
        src = "%s%s/ps1_target_stamp.jpeg" % (transient_cache,
                                              discoveryDataDictionary["transientBucketId"])
        dsrc = "%s%s/ps1_target_stamp.jpeg" % (download_prefix,
                                               discoveryDataDictionary["transientBucketId"])
    elif discoveryDataDictionary["ogle_target_stamp"]:
        stampName = "ogle_target_stamp.jpeg"
        src = "%s%s/ogle_target_stamp.jpeg" % (transient_cache,
                                               discoveryDataDictionary["transientBucketId"])
        dsrc = "%s%s/ogle_target_stamp.jpeg" % (download_prefix,
                                                discoveryDataDictionary["transientBucketId"])
    elif discoveryDataDictionary["css_stamp"]:
        stampName = "css_stamp.jpeg"
        src = "%s%s/css_stamp.jpeg" % (transient_cache,
                                       discoveryDataDictionary["transientBucketId"])
        dsrc = "%s%s/css_stamp.jpeg" % (download_prefix,
                                        discoveryDataDictionary["transientBucketId"])
    elif discoveryDataDictionary["mls_stamp"]:
        stampName = "mls_stamp.jpeg"
        src = "%s%s/mls_stamp.jpeg" % (transient_cache,
                                       discoveryDataDictionary["transientBucketId"])
        dsrc = "%s%s/mls_stamp.jpeg" % (download_prefix,
                                        discoveryDataDictionary["transientBucketId"])
    elif discoveryDataDictionary["sss_stamp"]:
        stampName = "sss_stamp.jpeg"
        src = "%s%s/sss_stamp.jpeg" % (transient_cache,
                                       discoveryDataDictionary["transientBucketId"])
        dsrc = "%s%s/sss_stamp.jpeg" % (download_prefix,
                                        discoveryDataDictionary["transientBucketId"])
    elif discoveryDataDictionary["lsq_stamp"]:
        stampName = "lsq_stamp.jpeg"
        src = "%s%s/lsq_stamp.jpeg" % (transient_cache,
                                       discoveryDataDictionary["transientBucketId"])
        dsrc = "%s%s/lsq_stamp.jpeg" % (download_prefix,
                                        discoveryDataDictionary["transientBucketId"])
    elif discoveryDataDictionary["master_stamp"]:
        stampName = "master_stamp.jpeg"
        src = "%s%s/master_stamp.jpeg" % (transient_cache,
                                          discoveryDataDictionary["transientBucketId"])
        dsrc = "%s%s/master_stamp.jpeg" % (download_prefix,
                                           discoveryDataDictionary["transientBucketId"])
    elif discoveryDataDictionary["bsl_stamp"]:
        remoteUrl = discoveryDataDictionary["tripletImageUrl"]
        theseLines = string.split(remoteUrl, '.')
        extension = theseLines[-1]
        stampName = "bsl_stamp.%(extension)s" % locals()
        src = "%s%s/bsl_stamp.%s" % (transient_cache,
                                     discoveryDataDictionary["transientBucketId"], extension)
    elif discoveryDataDictionary["targetImageUrl"]:
        stampName = "user_added_stamp.jpeg"
        src = discoveryDataDictionary["targetImageUrl"]
        dsrc = discoveryDataDictionary["targetImageUrl"]

    imageSource = khufu.a(
        content='image source',
        href=surveyObjectUrl,
    )

    if "stampName" not in locals():
        src = 'holder.js/400x400/auto/industrial/text:no stamp'
        stampName = "no_stamp"

    objectName = discoveryDataDictionary["masterName"]
    href = request.route_path(
        'download', _query={'url': dsrc, "webapp": "marshall_webapp", "filename": "%(objectName)s_image_stamp" % locals()})
    if stampName == "user_added_stamp.jpeg":
        href = discoveryDataDictionary["targetImageUrl"]

    objectStamp = khufu.imagingModal(
        log=log,
        imagePath=src,
        display="polaroid",  # [ rounded | circle | polaroid | False ]
        modalHeaderContent="Image Stamp for %(masterNameLink)s from %(survey)s" % locals(
        ),
        modalFooterContent=imageSource,
        downloadLink=href
    )
    objectStamp = objectStamp.get()

    # AKA NAMES
    rows = []
    for item in objectAkas:
        if item["transientBucketId"] == discoveryDataDictionary["transientBucketId"] and item["name"] != discoveryDataDictionary["masterName"]:
            rows.append(item)

    akaList = ""
    if len(rows) == 0:
        akaTitle = ""
    elif len(rows) == 1:
        akaTitle = "<br>aka: "
        row = rows[0]
        aka = row["name"]
        size = 3
        if len(aka) > 19:
            size = 2

        aka = khufu.a(
            content=aka,
            href=row["surveyObjectUrl"],
            openInNewTab=True
        )

        aka = khufu.coloredText(
            text=aka,
            color="orange",
            size=size,  # 1-10
            pull=False,  # "left" | "right"
        )
        akaList = aka
    else:
        akaTitle = "<br>akas: "
        for row in rows:
            log.debug('aka: %s' % (row,))
            aka = row["name"]
            if aka in akaList:
                continue

            aka = khufu.a(
                content=aka,
                href=row["surveyObjectUrl"],
                openInNewTab=True
            )
            aka = """&nbsp&nbsp&nbsp%(aka)s """ % locals()

            aka = khufu.coloredText(
                text=aka,
                color="orange",
                size=3,  # 1-10
                pull=False,  # "left" | "right"
            )

            aka = khufu.grid_row(
                responsive=True,
                columns=aka,
                htmlId=False,
                htmlClass="aka",
                onPhone=True,
                onTablet=True,
                onDesktop=True
            )
            akaList = "%(akaList)s %(aka)s" % locals()

    if len(akaList) != 0:
        akaTitle = cu.little_label(
            text=akaTitle,
            lineBreak=False
        )
        akaList = "%(akaTitle)s %(akaList)s" % locals()

    pi = ""
    if discoveryDataDictionary["classifiedFlag"] == 1:

        pi = cu.little_label(
            text="PI: ",
            lineBreak=False
        )

        if discoveryDataDictionary["pi_name"]:
            pi_name = discoveryDataDictionary["pi_name"]
            firstName = pi_name.split(' ', 1)[0]
            thisName = discoveryDataDictionary["masterName"]
            pi_email = discoveryDataDictionary["pi_email"]
            pi_name = khufu.a(
                content="""%(pi_name)s&nbsp<i class="icon-mail7"></i>""" % locals(),
                href="mailto:%(pi_email)s?subject=%(thisName)s&body=Hi %(firstName)s," % locals(
                ),
                tableIndex=False,
                triggerStyle=False,  # [ False | "dropdown" | "tab" ],
                htmlClass=False,
                postInBackground=False
            )
        else:
            pi_name = "no pi set"

        pi_name = khufu.coloredText(
            text=pi_name,
            color="cyan",
            size=3,
        )

        pi = khufu.grid_row(
            responsive=True,
            columns="%(pi)s %(pi_name)s" % locals(),
            htmlId=False,
            htmlClass=False,
            onPhone=True,
            onTablet=True,
            onDesktop=True
        )

    transientId = cu.little_label(
        text="pessto id: ",
        lineBreak=False
    )
    thisTransientBucketId = khufu.coloredText(
        text=discoveryDataDictionary["transientBucketId"],
        color="magenta",
        size=3,
    )

    transientId = khufu.grid_row(
        responsive=True,
        columns="%(transientId)s %(thisTransientBucketId)s" % locals(),
        htmlId=False,
        htmlClass=False,
        onPhone=True,
        onTablet=True,
        onDesktop=True
    )

    return "%(title)s %(masterName)s %(objectStamp)s %(pi)s %(akaList)s %(transientId)s" % locals()


###################################################################
# PRIVATE (HELPER) FUNCTIONS                                      #
###################################################################

if __name__ == '__main__':
    main()
