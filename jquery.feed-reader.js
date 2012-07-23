/*
 * ITEMAN Feed Reader - A jQuery plug-in for populating a feed to a DOM element
 * Copyright (c) 2009, 2012 ITEMAN, Inc. All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

jQuery.fn.readFeed = function (config) {
    config = jQuery.extend({
        uri: null,
        parameters: null,
        responseFormat: 'xml',
        jsonpCallbackKey: null,
        limit: null,
        documentClass: null
    }, config);

    var self = this;
    var ajaxSettings = {
        url: config.uri,
        dataType: config.responseFormat,
        cache: false,
        success: function (feed) {
            jQuery(feed).find('entry').each(function (i) {
                if (config.limit && i >= config.limit) {
                    return false;
                }

                self.append(
                    (config.documentClass ? '<li class="' + config.documentClass + '">' : '<li>') +
                    '<a href="' +
                    jQuery(this).find('link').attr('href') +
                    '" target="_blank">' +
                    jQuery(this).find('title').text() +
                    '</a>' +
                    '</li>'
                );
            });
        }
    };
    if (config.parameters) {
        ajaxSettings['data'] = config.parameters;
    }
    if (config.responseFormat == 'jsonp' && config.jsonpCallbackKey) {
        ajaxSettings['jsonp'] = config.jsonpCallbackKey;
    }

    jQuery.ajax(ajaxSettings);

    return this;
};

/*
 * Local Variables:
 * mode: javascript
 * coding: iso-8859-1
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * indent-tabs-mode: nil
 * End:
 */
