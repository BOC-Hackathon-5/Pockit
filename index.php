<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Pockit</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="stylesheet" type="text/css" href="css/pockit.css">
  <link rel="stylesheet" type="text/css" href="css/pockit-charts.css">
</head>
<body>

  <div class="container-fluid px-4"> <!-- CONTAINER -->

    <div class="row align-items-start mt-4 text-center">
      <div class="col-md-5 col-4"></div>
      <div class="col-md-2 col-4">
        <a href="index.php">
          <img src="img/logos/pockit-logo-sm.png" class="img-fluid" alt="...">
        </a>
      </div>
      <div class="col-md-5 col-4"></div>
    </div>

    <div class="row align-items-start"> <!-- MAIN -->

      <div class="col-md-5 col-12 mt-4 sticky-top">

        <div class="card pockit-card sticky-top" style="">
          <div class="card-body">
            <h5 class="card-title text-center mb-3">
              <span class="badge text-bg-warning pockit-badge" style="font-size: 16px;"><i class="bi bi-robot"></i> Pockit AI</span>
            </h5>

            <div class="alert alert-light alert-dismissible fade show pockit-badge" role="alert">
              <i class="bi bi-robot"></i>
              <strong>You've spent €1461.29 last month in Bars & Cafes!</strong> Reduce spending to free up more for savings or investments.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

            <div class="alert alert-light alert-dismissible fade show" role="alert">
              <i class="bi bi-robot"></i>
              <strong>Emergency Savings (16.7%, $499.18):</strong> Increase to 20% for better coverage, aiming for 3-6 months of expenses.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

            <div class="alert alert-light alert-dismissible fade show" role="alert">
              <i class="bi bi-robot"></i>
              <strong>Savings & Investments (28.1%, $766.88):</strong> You're doing well; consider higher-yield options for better growth.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>

            <!-- AI Response Chat -->
            <div id="pockit_ai_chat" class="pockit-ai-chat d-none">

              <section class="px-0 mx-0 pb">
                <div class="container px-0 mx-0">

                  <div class="row d-flex justify-content-center">
                    <div class="col-md-12 col-lg-12 col-xl-12">

                      <div class="content">

                        <div id="chat_box" class="card-body overflow-scroll" data-mdb-perfect-scrollbar-init style="position: relative; max-height: 460px">

                          <!-- Messages will be dynamically generated here -->

                        </div>

                      </div>

                    </div>
                  </div>

                </div>
              </section>

            </div> <!-- END OF AI Response Chat-->

            <!-- AI Loader -->
            <div id="ai_loader" class="row text-center mx-0 mt-4 d-none">
              <div class="col"></div>
              <div class="col-3 text-center">
                <div class="ai-loader"></div>
                <h6 class="mt-2"></h6>
              </div>
              <div class="col"></div>
            </div>
            <br>

            <form id="messageArea" class="input-group pockit-message-area">

              <div class="input-group">
                <button id="pockit_assistant_selector" class="btn btn-outline-dark dropdown-toggle pockit-badge pockit-bot-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-robot"></i></button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#" onclick="activatePockitGeneralAssistant();"><i class="bi bi-robot"></i> General Assistant</a></li>
                  <li><a class="dropdown-item" href="#" onclick="activatePockitLookupAssistant();"><i class="bi bi-robot"></i> Lookup Assistant <img style="width:70px;" src="img/logos/jinius-logo.png"></a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#"><i class="bi bi-info-circle"></i> Learn more</a></li>
                </ul>
                <!-- <textarea type="text" class="form-control" aria-label="Text input with dropdown button" placeholder="Ask for assistance..."></textarea> -->

                <textarea type="text" id="message_request" name="msg" placeholder="Ask me anything ..." autocomplete="off" class="form-control type_msg rounded-end" required></textarea>
                <!-- <div class="input-group-append"> -->
                  <button type="submit" id="send" class="btn btn-outline-secondary input-group-text send_btn rounded-circle"><i class="bi bi-send"></i></button>
                  <!-- </div> -->
                </form>

                <!-- <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="bi bi-send"></i></button> -->
              </div>

              <!-- Powered by Jinius -->
              <div id="placeholder_jinius" class="row d-none">
                <div class="col"></div>
                <div class="col btn-secondary rounded-bottom border border-light text-center px-0 pockit-color">
                  <i class="bi bi-stars"></i><img style="width:70px;" src="img/logos/jinius-logo.png"></a>
                </div>
                <div class="col"></div>
              </div>

            </div>
          </div>

        <!-- <div class="col mt-4">
          <div class="card pockit-card" style="">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" class="card-link">Card link</a>
              <a href="#" class="card-link">Another link</a>
            </div>
          </div>
        </div> -->

      </div>

      <div class="col-md-7 col-12 mt-4">

        <div class="card pockit-card" style="">
          <div class="card-body">
            <h5 class="card-title text-center"><i class="bi bi-wallet"></i> Pockets</h5>
            <br>

            <!-- Living Expenses -->
            <div class="row text-center">
              <div class="col">
                <h1><i class="bi bi-receipt"></i></h1>
                <h5 class="pockit-text-color"><strong>€ </strong><strong id="amount-4">10.000</strong></h5>

                <span class="dropdown badge text-bg-warning pockit-badge pockit-split-perc" data-pocketid="4"><i class="bi bi-pie-chart"></i> <span id="pocket-4" class="pockit-perc" data-pocketid="4">50%</span> <i class="bi bi-pencil-fill text-white pockit-btn-edit-perc d-none"></i><span id="spin-pocket-4" class="spinner-grow spinner-grow-sm d-none" role="status" aria-hidden="true"></span></span>

                <div class="input-group input-group-sm pockit-edit-perc-group m-0 pockit-edit-perc-input-group mx-auto mt-1 d-none" style="width: 50%;">
                  <span class="input-group-text pockit-badge m-0 py-0 px-1 mt-1"><i class="bi bi-pie-chart"></i></span>
                  <input type="text" class="form-control pockit-edit-perc-input text-center p-0 mt-1" aria-label="Amount (to the nearest dollar)" data-pocketid="4" value="">
                  <span class="input-group-text pockit-badge m-0 py-0 px-1 mt-1"> <i class="bi bi-pencil-fill text-white"></i></span>
                </div>
                
                <h6 class="mt-4">Living Expenses</h6>
                
              </div>

              <!-- Emergency Savings -->
              <div class="col">
                <h1><i class="bi bi-wallet"></i></h1>
                <h5 class="pockit-text-color"><strong>€ </strong><strong id="amount-1">1.000</strong></h5>
                
                <span class="dropdown badge text-bg-warning pockit-badge pockit-split-perc" data-pocketid="1"><i class="bi bi-pie-chart"></i> <span id="pocket-1" class="pockit-perc" data-pocketid="1">20%</span> <i class="bi bi-pencil-fill text-white pockit-btn-edit-perc d-none"></i><span id="spin-pocket-1" class="spinner-grow spinner-grow-sm d-none" role="status" aria-hidden="true"></span></span>

                <div class="input-group input-group-sm pockit-edit-perc-group m-0 pockit-edit-perc-input-group mx-auto mt-1 d-none" style="width: 50%;">
                  <span class="input-group-text pockit-badge m-0 py-0 px-1 mt-1"><i class="bi bi-pie-chart"></i></span>
                  <input type="text" class="form-control pockit-edit-perc-input text-center p-0 mt-1" aria-label="Amount (to the nearest dollar)" data-pocketid="1" value="">
                  <span class="input-group-text pockit-badge m-0 py-0 px-1 mt-1"> <i class="bi bi-pencil-fill text-white"></i></span>
                </div>
                
                <h6 class="mt-4">Emergency Savings</h6>
              </div>

              <!-- Savings & Investments -->
              <div class="col">
                <h1><i class="bi bi-piggy-bank"></i></h1>
                <h5 class="pockit-text-color"><strong>€ </strong><strong id="amount-2">1.000</strong></h5>
                
                <span class="dropdown badge text-bg-warning pockit-badge pockit-split-perc" data-pocketid="2"><i class="bi bi-pie-chart"></i> <span id="pocket-2" class="pockit-perc" data-pocketid="2">20%</span> <i class="bi bi-pencil-fill text-white pockit-btn-edit-perc d-none"></i><span id="spin-pocket-2" class="spinner-grow spinner-grow-sm d-none" role="status" aria-hidden="true"></span></span>

                <div class="input-group input-group-sm pockit-edit-perc-group m-0 pockit-edit-perc-input-group mx-auto mt-1 d-none" style="width: 50%;">
                  <span class="input-group-text pockit-badge m-0 py-0 px-1 mt-1"><i class="bi bi-pie-chart"></i></span>
                  <input type="text" class="form-control pockit-edit-perc-input text-center p-0 mt-1" aria-label="Amount (to the nearest dollar)" data-pocketid="2" value="">
                  <span class="input-group-text pockit-badge m-0 py-0 px-1 mt-1"> <i class="bi bi-pencil-fill text-white"></i></span>
                </div>
                
                <h6 class="mt-4">Savings & Investments</h6>
              </div>

              <!-- Splurge Money -->
              <div class="col">
                <h1><i class="bi bi-bag"></i></h1>
                <h5 class="pockit-text-color"><strong>€ </strong><strong id="amount-3">500</strong></h5>
                
                <span class="dropdown badge text-bg-warning pockit-badge pockit-split-perc" data-pocketid="3"><i class="bi bi-pie-chart"></i> <span id="pocket-3" class="pockit-perc" data-pocketid="3">10%</span> <i class="bi bi-pencil-fill text-white pockit-btn-edit-perc d-none"></i><span id="spin-pocket-3" class="spinner-grow spinner-grow-sm d-none" role="status" aria-hidden="true"></span></span>


                <div class="input-group input-group-sm pockit-edit-perc-group m-0 pockit-edit-perc-input-group mx-auto mt-1 d-none" style="width: 50%;">
                  <span class="input-group-text pockit-badge m-0 py-0 px-1 mt-1"><i class="bi bi-pie-chart"></i></span>
                  <input type="text" class="form-control pockit-edit-perc-input text-center p-0 mt-1" aria-label="Amount (to the nearest dollar)" data-pocketid="3" value="">
                  <span class="input-group-text pockit-badge m-0 py-0 px-1 mt-1"> <i class="bi bi-pencil-fill text-white"></i></span>
                </div>
                <!-- <div class="spinner-border text-secondary" role="status"></div> -->
                
                <h6 class="mt-4">Splurge Money</h6>
              </div>
            </div>

            <!-- <br>
            <br>
            <div class="text-center">

              <span class="badge text-bg-secondary pockit-badge">
                <div class="dropdown-center">
                  <button class="btn btn-light btn-sm dropdown-toggle pockit-badge" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Pockit 50/20/20/10
                  </button>

                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">
                      Pockit 50/20/20/10 <i class="bi bi-check2-circle"></i>
                    </a></li>
                    <li><a class="dropdown-item text-secondary" href="#" data-bs-toggle="modal" data-bs-target="#staticBackdropGetPlus">
                      SIBYU 25/25/25/25 <span class="badge text-bg-warning pockit-badge"><i class="bi bi-stars"></i> Plus +</span>
                    </a></li>
                    <li><a class="dropdown-item text-secondary" href="#" data-bs-toggle="modal" data-bs-target="#staticBackdropGetPlus">
                      Custom <span class="badge text-bg-warning pockit-badge"><i class="bi bi-stars"></i> Plus +</span>
                    </a></li>
                  </ul>
                </div>
                <div class="mt-1"><i class="bi bi-sign-intersection-y"></i> Split Strategy</div>
              </span>

            </div> -->

          </div>
        </div>


        <div id="section_analytics" class="col-12 mt-4">
          <div class="card pockit-card" style="">
            <div class="card-body">
              <h5 class="card-title text-center"><i class="bi bi-graph-up-arrow"></i> Analytics</h5>
              <br>

              <div class="row">
                <div class="col pockit-stat-block">
                  <h5>€ 12.500</h5>
                  Total Income
                </div>
                <div class="col pockit-stat-block">
                  <h5>100 %</h5>
                  Income Growth Rate
                </div>
                <div class="col pockit-stat-block">
                  <h5>€ 2.000</h5>
                  Total Savings
                </div>
                <div class="col pockit-stat-block">
                  <h5>10 %</h5>
                  Savings Growth Rate
                </div>
              </div>
              <br>
              <br>

              <h5><strong>Savings per pocket over time</strong></h5>
              <!-- HTML -->
              <div id="chartdiv"></div>

              <br>
              <br>

              <div class="row">
                <div class="col-12">
                  <h5><strong>Living Expenses spending categories</strong></h5>
                  <div id="chartdiv2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- moved -->

    </div> <!-- END OF MAIN -->

    <!-- MAIN -->
    <!-- <div class="row align-items-start">
      <div class="col mt-4">
        <div class="card pockit-card" style="">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div>
        </div>
      </div>
      <div class="col mt-4">
        <div class="card pockit-card" style="">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div>
        </div>
      </div>
    </div>


    <div class="row align-items-start"> 
      <div class="col mt-4">
        <div class="card pockit-card" style="">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div>
        </div>
      </div>
      <div class="col mt-4">
        <div class="card pockit-card" style="">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div>
        </div>
      </div>
    </div>
  -->

  <div class="text-center">

    <nav class="row navbar sticky-bottom pockit-sticky-nav mx-auto mb-3">
      <div class="col-lg-4 col-md-2 col-1"></div>
      <div class="col-lg-4 col-md-6 col-10">
        <div class="card pockit-card mx-auto" style="">
          <div class="card-body">
            <div class="row">
              <div class="col">

                <a class="navbar-brand" href="#">
                  <img src="img/assets/profile.png" class="rounded-circle object-fit-cover" style="width: 50px;" alt="...">
                  <span class="m-2 d-none d-sm-inline"> John Smith</span>
                  <!-- <span class="badge text-bg-light"><i class="bi bi-stars"></i></span> -->
                </a>

                <a type="button" class="btn btn-lg btn-light pockit-nav-btn" href="index.php">
                  <i class="bi bi-house"></i>
                </a>

                <button type="button" class="btn btn-lg btn-light pockit-nav-btn" data-bs-toggle="button" onclick="toggleAnalytics();">
                  <i class="bi bi-graph-up-arrow"></i>
                </button>

                <button type="button" class="btn btn-lg btn-light pockit-nav-btn" data-bs-toggle="button">
                  <i class="bi bi-gear"></i>
                </button>


              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-2 col-1"></div>
    </nav>

  </div>

  <br><br><br><br><br>

</div> <!-- END OF CONTAINER -->

<!-- Modal -->
<div class="modal fade" id="staticBackdropGetPlus" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Get <span class="badge text-bg-warning pockit-badge"><i class="bi bi-stars"></i> Plus +</span></h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-center">
        <h6>
          Do more with
        </h6>
        <img style="width: 130px;" src="img/logos/pockit-logo-sm.png"> <span class="badge text-bg-warning pockit-badge"><i class="bi bi-stars"></i> Plus +</span>

        <br>
        <em>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"></li>
            <li class="list-group-item">Manage Your Income More Efficiently</li>
            <li class="list-group-item">More Split Strategies</li>
            <li class="list-group-item">Custom Split Strategies</li>
            <li class="list-group-item">Enhanced Analytics</li>
            <li class="list-group-item">Enhanced Recommendations</li>
            <li class="list-group-item">and much more...</li>
          </ul>
        </em>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Maybe Later</button>
        <button type="button" class="btn btn-secondary pockit-badge">Upgrade to Plus</button>
      </div>
    </div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>

<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/percent.js"></script>
<script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
<script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
<script src="https://cdn.amcharts.com/lib/5/locales/de_DE.js"></script>
<script src="https://cdn.amcharts.com/lib/5/geodata/germanyLow.js"></script>
<script src="https://cdn.amcharts.com/lib/5/fonts/notosans-sc.js"></script>

<!-- Piecharts -->


<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

<script type="text/javascript" src="js/pockit.js"></script>
<script type="text/javascript" src="js/pockit-charts.js"></script>

</body>
</html>