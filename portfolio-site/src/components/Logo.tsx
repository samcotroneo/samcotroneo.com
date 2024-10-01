const NavBar = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 1080 1080"
        fill="currentColor"
        stroke="currentColor"
      >
        <path d="M 357.5,955.94657 C 309.99098,951.18828 272.86195,941.38182 238.5,924.51648 214.32148,912.64931 194.01168,898.3431 175.62637,880.22834 142.98966,848.0719 123.2712,812.84821 113.95626,770.06514 112.03505,761.24108 109,740.87895 109,736.81358 109,735.08592 111.40892,735 159.84846,735 h 50.84846 l 1.17559,8.40347 c 4.36821,31.22539 18.29816,57.45687 41.01719,77.23947 26.69024,23.24054 59.35207,37.39872 102.33078,44.35812 13.06249,2.11516 40.82594,3.77372 53.30393,3.18431 l 7.02441,-0.3318 L 404.41323,856.562 C 374.19884,825.92435 349.31985,789.51507 329.66081,747.16518 305.86424,695.90212 291.68242,630.19786 289.33292,560.32632 l -0.64473,-19.17369 -4.59409,-1.72925 c -2.52676,-0.95109 -10.4309,-4.41855 -17.56477,-7.70547 -48.83642,-22.50133 -88.36342,-53.67106 -108.83871,-85.82671 -37.78206,-59.3353 -35.42272,-150.10349 5.48962,-211.19653 21.76086,-32.49476 52.06843,-59.36523 88.36531,-78.34401 35.21098,-18.411 66.74218,-28.20503 109.45445,-33.99806 17.10762,-2.3203 74.06231,-2.63806 91.5,-0.5105 23.0679,2.8145 45.47062,7.63254 65.86318,14.16486 l 9.59715,3.07424 11.26984,-3.48851 c 38.60999,-11.9515 71.14837,-16.21845 116.84469,-15.32255 43.81811,0.85908 79.38108,7.06467 114.92514,20.05395 29.25972,10.69273 61.82109,28.22785 84.44771,45.47724 39.96019,30.46363 72.56196,70.9395 93.3265,115.86708 5.00701,10.83351 12.22579,29.31298 12.22579,31.297 0,0.72666 -15.84112,0.9725 -51.14049,0.79367 L 858.71902,333.5 l -4.97101,-9 C 820.63223,264.54386 759.42688,225.12481 683,214.53045 c -14.21805,-1.97092 -46,-3.2579 -46,-1.86273 0,0.54049 2.07917,3.64885 4.62037,6.90749 C 658.91958,241.75834 671.11904,266.48439 677.35368,292 679.99382,302.80494 683,323.06394 683,330.05122 V 334 h -47.53138 c -37.16321,0 -47.61124,-0.27267 -47.89746,-1.25 -0.20133,-0.6875 -1.11472,-5.3 -2.02975,-10.25 -3.17357,-17.16803 -10.04701,-33.5607 -20.12638,-48 -6.06475,-8.68813 -19.83384,-22.48255 -28.89603,-28.94919 l -6.83635,-4.87832 -5.09133,2.80965 C 455.97683,281.34716 408.02355,355.64079 391.61584,449.5 c -1.34605,7.7 -2.76525,17.23035 -3.15377,21.17856 l -0.70641,7.17856 4.37217,1.15079 c 89.50233,23.55768 119.16439,32.55432 153.26654,46.48647 23.61722,9.64862 53.46127,26.71835 74.10563,42.38579 8.89225,6.74851 26.76034,24.43168 34.47665,34.11983 29.78548,37.39695 41.19974,73.98329 39.73689,127.36938 -0.71246,26.0009 -3.26218,41.14172 -10.8838,64.63062 -6.84942,21.10909 -24.02632,52.51625 -35.6859,65.25 l -2.51802,2.75 6.43709,-0.0158 c 19.34606,-0.0476 47.30705,-3.98644 67.41016,-9.49609 41.90414,-11.48465 75.08348,-30.75257 103.54542,-60.13092 15.23474,-15.72527 24.54416,-28.65762 34.22077,-47.53841 L 861.27148,735 h 50.86426 C 940.11108,735 963,735.14059 963,735.31241 c 0,2.46314 -9.95901,28.16046 -15.87095,40.95194 -17.29216,37.41456 -50.27407,79.00988 -84.12905,106.09983 -32.91413,26.3371 -75.24353,47.82806 -116.38464,59.08936 -29.59379,8.10052 -54.29602,11.57464 -87.28539,12.27581 -44.46425,0.94506 -83.35528,-3.7708 -116.76306,-14.15849 l -7.93309,-2.46669 -11.56691,3.51719 c -21.72054,6.60466 -43.19653,11.01335 -68.06691,13.9731 -15.77135,1.87691 -82.95741,2.80862 -97.5,1.35211 z M 539.01068,829.63168 c 19.47905,-13.11244 37.50492,-33.11914 46.75207,-51.88958 9.08795,-18.44729 12.49874,-33.50476 12.62661,-55.7421 0.0989,-17.19839 -1.03173,-24.81809 -5.63848,-38 -7.34216,-21.00904 -22.34506,-38.33005 -47.25088,-54.55163 -23.04857,-15.01191 -59.51246,-28.95042 -124,-47.39961 -17.6,-5.03517 -32.7875,-9.38631 -33.75,-9.66919 -1.51187,-0.44436 -1.7498,0.20923 -1.74851,4.80304 0.002,7.21549 3.53769,36.81287 6.00845,50.29722 16.71956,91.24835 62.00362,161.80706 129.35325,201.54994 4.47525,2.64083 8.81661,4.83948 9.64749,4.88587 0.83087,0.0464 4.43087,-1.88139 8,-4.28396 z M 298.47865,428 c 14.60427,-81.45583 50.85122,-153.86539 104.86055,-209.47709 5.86344,-6.0374 10.6608,-11.0999 10.6608,-11.25 0,-0.60011 -15.28511,-0.1991 -28.5,0.7477 -52.99134,3.79664 -92.03877,19.37067 -122.93536,49.03263 -26.189,25.14249 -38.70789,58.97069 -35.50725,95.94676 2.68392,31.00657 14.74775,51.90991 42.42621,73.5131 9.3458,7.29445 25.90824,17.89348 26.1967,16.76441 0.10925,-0.42763 1.36851,-7.30251 2.79835,-15.27751 z" />
      </svg>
    </>
  );
};

export default NavBar;
