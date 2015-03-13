#!/usr/local/bin/python
# encoding: utf-8
"""
generate_ob_form.py
=========================
:Summary:
    The generate object form for the PESSTO Marshall

:Author:
    David Young

:Date Created:
    March 7, 2014

:Notes:
    - If you have any questions requiring this script/module please email me: d.r.young@qub.ac.uk

:Tasks:
"""
################# GLOBAL IMPORTS ####################
import sys
import os
from datetime import datetime, date, time
from docopt import docopt
from dryxPython import commonutils as dcu
import khufu
import dryxPython.astrotools as dat
from ..tickets.single_ticket.ticket_building_blocks.lightcurve_block import lightcurve_block as lcb

###################################################################
# PUBLIC FUNCTIONS                                                #
###################################################################
# LAST MODIFIED : March 7, 2014
# CREATED : March 7, 2014
# AUTHOR : DRYX


def generate_ob_form(
    log,
    request,
    discoveryDataDictionary,
    lightcurveData,
    objectAkas
):
    """generate object form

    **Key Arguments:**
        - ``log`` -- the logger
        - ``request`` -- the pyramid request
        - ``discoveryDataDictionary`` -- dictionary of the transient's discovery data
        - ``lightcurveData`` -- lightcurve data
        - ``objectAkas`` -- akas for this object

    **Return:**
        - ``modalForm``, ``thisButton`` -- the modal form and the button used to trigger the modal

    **Todo**
    """
    # Header Text
    lsqExists = False
    masterName = discoveryDataDictionary["masterName"]
    if discoveryDataDictionary["classifiedFlag"] == 0:
        headerText = "Generate Classification OB for %(masterName)s" % locals()
    else:
        headerText = "Generate Followup OB for %(masterName)s" % locals()

    # Get Lightcurve Image URL
    lightCurveImage = ""
    if discoveryDataDictionary["master_pessto_lightcurve"]:
        lightCurveImage = request.static_path(
            'marshall_webapp:static/caches/transients/%s/master_lightcurve.png' % (
                discoveryDataDictionary["transientBucketId"],))
    # Override for LSQ lightcurves
    lightcurveSwitchAttempt = True
    transientBucketId = discoveryDataDictionary["transientBucketId"]
    for row in lightcurveData:
        if row["transientBucketId"] == discoveryDataDictionary["transientBucketId"] and "lsq-disc" in row["survey"].lower():
            lightcurveSwitchAttempt = False
    if lightcurveSwitchAttempt == True:
        filePath = request.registry.settings["downloads"][
            "transient cache directory"] + "/%(transientBucketId)s/lsq_lightcurve.gif" % locals()
        lsqExists = os.path.exists(filePath)

    if lsqExists:
        transientBucketId = discoveryDataDictionary["transientBucketId"]
        lightCurveImage = request.static_path(
            'marshall_webapp:static/caches/transients/%(transientBucketId)s/lsq_lightcurve.gif' % locals(
            ))
    if not len(lightCurveImage):
        lightCurveImage = khufu.image(
            # [ industrial | gray | social ]
            src="""holder.js/190x190/auto/industrial/text:master lightcurve not ready""",
            display="polaroid",  # [ rounded | circle | polaroid | False ]
        )

    # Convert Lightcurve into image
    lightCurveImage = khufu.image(
        src=lightCurveImage,  # [ industrial | gray | social ]
        pull=False,  # [ "left" | "right" | "center" | False ]
        width=400
    )

    # get latest magnitudes
    littleTitle = """<span class="colortext grey littlelabel  ">latest magnitudes:</span>"""
    numOfPointsToDisplay = 3
    count = 0
    rows = []
    magnitudes = ""
    for dataPoint in lightcurveData:
        if dataPoint["transientBucketId"] == discoveryDataDictionary["transientBucketId"]:
            row = dataPoint
            rows.append(row)
            count += 1
            if count >= numOfPointsToDisplay:
                break
    for row in rows:
        ffilter = ""
        if row["filter"]:
            ffilter = row["filter"]
            ffilter = """%(ffilter)s-band""" % locals()
        survey = khufu.coloredText(
            text="""%s %s""" % (row["survey"], ffilter, ),
            color="orange",
            size=3,
            pull="left"
        )
        relDate = dcu.pretty_date(
            date=row["observationDate"]
        )
        dateObs = khufu.coloredText(
            text="""%s""" % (
                str(row["observationDate"])[0:10],),
            color="violet",
            pull="left",
            size=2
        )
        relDate = khufu.coloredText(
            text="""  %s""" % (relDate[1:]),
            color="magenta",
            pull="left",
            size=2
        )
        survey = khufu.grid_row(
            responsive=True,
            columns=survey
        )
        dateObs = khufu.grid_row(
            responsive=True,
            columns="%(dateObs)s %(relDate)s" % locals()
        )
        info = khufu.grid_column(
            span=6,  # 1-12
            offset=0,  # 1-12
            content="%(survey)s %(dateObs)s" % locals(),
            pull="left",  # ["right", "left", "center"]
            htmlId=False,
            htmlClass=False,
            onPhone=True,
            onTablet=True,
            onDesktop=True
        )
        if row["magnitude"]:
            mag = khufu.coloredText(
                text="""%4.2f""" % (row["magnitude"],),
                color="green",
                size=6,
                pull="left"
            )
        else:
            mag = khufu.coloredText(
                text="""%s""" % (row["magnitude"],),
                color="green",
                size=6,
                pull="left"
            )
        mag = khufu.grid_column(
            span=3,  # 1-12
            offset=0,  # 1-12
            content=mag,
            pull="left",  # ["right", "left", "center"]
        )
        mag = khufu.grid_column(
            span=5,  # 1-12
            offset=0,  # 1-12
            content="%(mag)s %(info)s" % locals(),
            pull="left",  # ["right", "left", "center"]
        )
        magnitudes = "%(magnitudes)s<BR><p>%(mag)s</p>" % locals()

    magnitudes = "%(littleTitle)s<span>%(magnitudes)s</span>" % locals()

    # x-tmpx-form-control-group
    downloadButton = khufu.button(
        buttonText="""<i class="icon-download-alt"></i>""",
        # [ default | primary | info | success | warning | danger | inverse | link ]
        buttonStyle='info',
        buttonSize='default',  # [ large | default | small | mini ]
        htmlId="generateOBForm%(transientBucketId)s" % discoveryDataDictionary,
        htmlClass="generateOBSubmitButton",
        href=False,
        pull=False,  # right, left, center
        submit=True,
        block=False,
        disable=False,
        dataToggle=False,
        close=False
    )

    ######
    postToScript = request.route_path(
        'transients_element_obs', elementId=discoveryDataDictionary["transientBucketId"], _query={"method": "get"})

    thisModal = khufu.modals.modalForm(
        log=log,
        title=headerText,
        postToScriptUrl=postToScript,
        reloadToUrl=False
    )
    thisModal.submitButtonText = """<i class="icon-download-alt"></i>"""

    thisModal.add_form_object(
        formObject=magnitudes,
        label=lightCurveImage
    )
    seeing = khufu.checkbox(
        optionText='seeing > 1.5 arcsec',
        inline=True,
        htmlId="badSeeing",
        optionNumber=1,
        inlineHelpText=False,
        blockHelpText=False,
        disabled=False
    )

    defaultValue = discoveryDataDictionary["currentMagnitude"]
    if defaultValue:
        defaultValue = """%(defaultValue)5.2f""" % locals()
    else:
        defaultValue = "?"

    magnitudeInput = khufu.formInput(
        # [ text | password | datetime | datetime-local | date | month | time | week | number | float | email | url | search | tel | color ]
        ttype='text',
        placeholder='',
        span=2,
        htmlId="currentMag",
        required=True,
        defaultValue=defaultValue,
        divWrap=False
    )
    thisModal.add_form_object(
        formObject=magnitudeInput + "&nbsp" + seeing,
        label="current mag estimate"
    )

    modalForm, modalTrigger = thisModal.get()

    popover = khufu.popover(
        tooltip=True,
        placement="right",
        trigger="hover",
        title="generate an OB for this object",
        content=False,
    )

    thisButton = khufu.button(
        # [ default | primary | info | success | warning | danger | inverse | link ]
        buttonText="OB",
        buttonStyle='success',
        buttonSize='large',  # [ large | default | small | mini ]
        href=modalTrigger,
        pull=False,  # right, left, center
        submit=False,
        block=False,
        disable=False,
        dataToggle="modal",  # [ modal ]
        popover=popover
    )

    return modalForm, thisButton

# use the tab-trigger below for new function
# x-def-with-logger

if __name__ == '__main__':
    main()
