#!/usr/local/bin/python
# encoding: utf-8
"""
topnavbar.py
============
:Summary:
    The top navigation bar for the PESSTO Marshall

:Author:
    David Young

:Date Created:
    November 20, 2013

:Notes:
    - If you have any questions requiring this script/module please email me: d.r.young@qub.ac.uk

:Tasks:
"""
################# GLOBAL IMPORTS ####################
import sys
import os
from docopt import docopt
import khufu
from dryxPython import commonutils as dcu


def topnavbar(log,
              request
              ):
    """
    Get a top navigation bar for the pessto marshall.

    **Key Arguments:**
        - ``log`` -- logger

    **Return:**
        - ``topNavBar`` -- the top navigation bar for the pessto marshall

    **Todo**
    """
    log.info('starting the ``topNavigationBar`` function')

    username = request.authenticated_userid
    username = username.replace(".", " ")
    if username:
        href = request.route_path('logout')
        logout = khufu.a(
            content="logout",
            href=href,
        )
        username = """%(username)s (%(logout)s)""" % locals()
    else:
        href = request.route_path('login')
        username = khufu.a(
            content="login",
            href=href,
        )

    icon = khufu.image(
        src='/static/images/home_button_body.png',
        href=False,
        display=False,  # [ rounded | circle | polaroid ]
        pull="left",  # [ "left" | "right" | "center" ]
        htmlClass=False,
        thumbnail=False,
        width=25,
        onPhone=True,
        onTablet=True,
        onDesktop=True
    )

    marshallHome = khufu.a(
        content='marshall',
        href=request.route_path('transients'))
    statsHome = khufu.a(
        content='stats',
        href=request.route_path('stats'))

    pesstoHome = khufu.a(
        content='pessto.org',
        href='http://www.pessto.org',
        tableIndex=False,
        # table index for the dropdown menus [ False | -1 ]
        triggerStyle=False)  # used as a dropdown or tab trigger? [ False | "dropdown" | "tab" ]
    pesstoWiki = khufu.a(
        content="wiki",
        href='https://sites.google.com/a/pessto.org/wiki/',
        tableIndex=False,
        # table index for the dropdown menus [ False | -1 ]
        triggerStyle=False)  # used as a dropdown or tab trigger? [ False | "dropdown" | "tab" ]
    pesstoGroups = khufu.a(
        content="groups",
        href='https://groups.google.com/a/pessto.org/forum/#!myforums',
        tableIndex=False,
        # table index for the dropdown menus [ False | -1 ]
        triggerStyle=False)  # used as a dropdown or tab trigger? [ False | "dropdown" | "tab" ]
    pesstoDocs = khufu.a(
        content="drive",
        href='https://drive.google.com/a/pessto.org/?tab=go#home',
        tableIndex=False,
        # table index for the dropdown menus [ False | -1 ]
        triggerStyle=False)  # used as a dropdown or tab trigger? [ False | "dropdown" | "tab" ]
    help = khufu.a(
        content='help & reference',
        href='http://www.pessto.org/wiki/index.py',
        tableIndex=False,
        # table index for the dropdown menus [ False | -1 ]
        triggerStyle=False)  # used as a dropdown or tab trigger? [ False | "dropdown" | "tab" ]
    finderChartsRepo = khufu.a(
        content='finder charts',
        href='https://sites.google.com/a/pessto.org/wiki/pessto-wiki/home/finder-chart-repo',
        tableIndex=False,
        # table index for the dropdown menus [ False | -1 ]
        triggerStyle=False)  # used as a dropdown or tab trigger? [ False | "dropdown" | "tab" ]
    externalData = khufu.a(
        content='external data',
        href='http://www.pessto.org/private/data/external',
        tableIndex=False,
        # table index for the dropdown menus [ False | -1 ]
        triggerStyle=False)  # used as a dropdown or tab trigger? [ False | "dropdown" | "tab" ]
    observingCalendar = khufu.a(
        content='observing calendar',
        href=request.route_path('calendars'),
        tableIndex=False,
        # table index for the dropdown menus [ False | -1 ]
        triggerStyle=False)  # used as a dropdown or tab trigger? [ False | "dropdown" | "tab" ]

    href = request.route_path('transients_search')
    searchbox = khufu.searchbox(
        size='large',
        htmlId="q",
        placeHolder="search by object or pi",
        navBar=True,
        pull='right',
        actionScript=href
    )

    insideNavList = khufu.nav_list(
        itemList=[
            marshallHome, statsHome, pesstoHome, pesstoWiki, observingCalendar, pesstoGroups,
            pesstoDocs, finderChartsRepo, externalData, help],
        pull='left',  # [ False | 'right' | 'left' ]
        onPhone=True,
        onTablet=True,
        onDesktop=True,
    )

    outsideNavList = khufu.nav_list(
        itemList=[searchbox],
        pull='right',  # [ False | 'right' | 'left' ]
        onPhone=True,
        onTablet=True,
        onDesktop=True,
    )

    topNavBar = khufu.responsive_navigation_bar(
        shade='dark',
        brand=icon,
        loginDetails=username,
        outsideNavList=outsideNavList,
        insideNavList=insideNavList,
        htmlId=False,
        onPhone=True,
        onTablet=True,
        onDesktop=True
    )

    log.info('completed the ``topNavigationBar`` function')

    return topNavBar

###################################################################
# PRIVATE (HELPER) FUNCTIONS                                      #
###################################################################


if __name__ == '__main__':
    main()
